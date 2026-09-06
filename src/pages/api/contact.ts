import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// Esta ruta corre on-demand dentro del proceso Node (output: 'hybrid' +
// adapter @astrojs/node), el resto del sitio se sirve pre-renderizado como
// HTML estático.
export const prerender = false;

interface ContactPayload {
  name: string;
  email: string;
  need: string;
  message: string;
  company?: string;
  whatsapp?: string;
  /** Honeypot: campo invisible para humanos. Si viene con valor, es un bot. */
  website?: string;
  /** Timestamp (ms) de cuándo se mostró el formulario, para detectar envíos demasiado rápidos. */
  formRenderedAt?: number;
}

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  email: 200,
  need: 80,
  message: 3000,
  company: 150,
  whatsapp: 40,
};

// Rate limiting en memoria (por instancia). Suficiente como primera barrera;
// para producción a escala se recomienda un store compartido (p. ej. Upstash Redis).
const RATE_LIMIT_MAX = Number(import.meta.env.CONTACT_FORM_RATE_LIMIT_MAX) || 5;
const RATE_LIMIT_WINDOW_MS = Number(import.meta.env.CONTACT_FORM_RATE_LIMIT_WINDOW_MS) || 60_000;
const hits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[\r\n]{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

interface Lead {
  name: string;
  email: string;
  need: string;
  message: string;
  company: string;
  whatsapp: string;
}

/** Envía el lead por correo desde una cuenta de Gmail (requiere GMAIL_USER + contraseña de aplicación). */
async function sendEmail(lead: Lead): Promise<boolean> {
  const gmailUser = import.meta.env.GMAIL_USER;
  const gmailAppPassword = import.meta.env.GMAIL_APP_PASSWORD;
  const to = import.meta.env.CONTACT_EMAIL_TO || gmailUser;

  if (!gmailUser || !gmailAppPassword || !to) return false;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  await transporter.sendMail({
    from: `"Dev Works — Sitio web" <${gmailUser}>`,
    to,
    replyTo: lead.email,
    subject: `Nuevo contacto desde la web: ${lead.name} — ${lead.need}`,
    text: [
      `Nombre: ${lead.name}`,
      `Email: ${lead.email}`,
      `Empresa: ${lead.company || "-"}`,
      `WhatsApp: ${lead.whatsapp || "-"}`,
      `Necesita: ${lead.need}`,
      "",
      "Mensaje:",
      lead.message,
    ].join("\n"),
    html: `
      <div style="font-family: sans-serif; font-size: 14px; color: #111;">
        <h2 style="margin-bottom: 16px;">Nuevo contacto desde la web de Dev Works</h2>
        <p><strong>Nombre:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Empresa:</strong> ${lead.company || "-"}</p>
        <p><strong>WhatsApp:</strong> ${lead.whatsapp || "-"}</p>
        <p><strong>Necesita:</strong> ${lead.need}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap;">${lead.message}</p>
      </div>
    `,
  });

  return true;
}

/** Reenvía el lead a un webhook externo (Slack, Zapier, un CRM, etc.), si está configurado. */
async function sendToWebhook(lead: Lead): Promise<boolean> {
  const webhookUrl = import.meta.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhookUrl) return false;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source: "landing" }),
  });

  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" });
  }

  // Honeypot: si el campo trampa viene lleno, es un bot. Respondemos 200 "falso"
  // para no darle información útil al bot.
  if (payload.website) {
    return jsonResponse(200, { ok: true });
  }

  // Envíos demasiado rápidos (<2s) suelen ser bots rellenando el form automáticamente.
  if (payload.formRenderedAt && Date.now() - payload.formRenderedAt < 2000) {
    return jsonResponse(200, { ok: true });
  }

  const ip = clientAddress || "unknown";
  if (isRateLimited(ip)) {
    return jsonResponse(429, { ok: false, error: "rate_limited" });
  }

  const name = sanitize(payload.name, MAX_LENGTHS.name);
  const email = sanitize(payload.email, MAX_LENGTHS.email);
  const need = sanitize(payload.need, MAX_LENGTHS.need);
  const message = sanitize(payload.message, MAX_LENGTHS.message);
  const company = sanitize(payload.company, MAX_LENGTHS.company);
  const whatsapp = sanitize(payload.whatsapp, MAX_LENGTHS.whatsapp);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "El nombre es obligatorio.";
  if (!email || !isValidEmail(email)) errors.email = "Ingresa un email válido.";
  if (!need) errors.need = "Cuéntanos qué necesitas.";
  if (!message || message.length < 10) errors.message = "El mensaje es muy corto.";

  if (Object.keys(errors).length > 0) {
    return jsonResponse(422, { ok: false, error: "validation_error", fields: errors });
  }

  const lead: Lead = { name, email, need, message, company, whatsapp };
  let delivered = false;

  try {
    delivered = (await sendEmail(lead)) || delivered;
  } catch (err) {
    console.error("[contact] Error enviando el correo por Gmail:", err);
  }

  try {
    delivered = (await sendToWebhook(lead)) || delivered;
  } catch (err) {
    console.error("[contact] Error reenviando el lead al webhook:", err);
  }

  if (!delivered) {
    // Ni Gmail ni webhook configurados: se registra en el log del servidor como fallback,
    // para que el lead no se pierda mientras se termina de configurar el envío.
    console.log("[contact] Nuevo lead (sin canal de envío configurado):", lead);
  }

  return jsonResponse(200, { ok: true });
};
