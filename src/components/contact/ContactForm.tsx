import { useRef, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";
import { useTranslations } from "@/i18n/utils";
import { defaultLocale, type Locale } from "@/i18n/config";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  company: string;
  whatsapp: string;
  need: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  whatsapp: "",
  need: "",
  message: "",
};

interface ContactFormProps {
  lang?: Locale;
}

export default function ContactForm({ lang = defaultLocale }: ContactFormProps) {
  const t = useTranslations(lang);
  const NEED_OPTIONS = t.contactForm.needOptions;

  function buildWhatsAppMessage(values: FormState): string {
    const wa = t.contactForm.whatsappMessage;
    const lines = [`${wa.intro}`, ``, `${wa.name}: ${values.name}`, `${wa.email}: ${values.email}`];
    if (values.company) lines.push(`${wa.company}: ${values.company}`);
    lines.push(`${wa.need}: ${values.need}`, ``, `${wa.message}:`, values.message);
    return lines.join("\n");
  }

  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasStartedRef = useRef(false);
  const renderedAtRef = useRef<number>(Date.now());

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("contact_form_start");
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) nextErrors.name = t.contactForm.errors.name;
    if (!values.email.trim() || !isValidEmail(values.email)) nextErrors.email = t.contactForm.errors.email;
    if (!values.need) nextErrors.need = t.contactForm.errors.need;
    if (!values.message.trim() || values.message.trim().length < 10)
      nextErrors.message = t.contactForm.errors.message;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submitToApiInBackground(honeypot: string) {
    // Se envía en segundo plano (no bloquea la experiencia del usuario). Sirve
    // como respaldo/registro server-side y para el envío por correo si más
    // adelante se configura Gmail o un webhook.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        website: honeypot,
        formRenderedAt: renderedAtRef.current,
      }),
    }).catch((err) => {
      console.error("No se pudo registrar el lead en el backend:", err);
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    // Canal principal: WhatsApp. Se abre de forma síncrona (dentro del mismo
    // click) para que el navegador no lo bloquee como pop-up.
    if (site.whatsapp.isConfigured) {
      const message = buildWhatsAppMessage(values);
      const url = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      submitToApiInBackground(honeypot);
      trackEvent("contact_form_submit", { need: values.need, channel: "whatsapp" });
      setStatus("success");
      setValues(initialState);
      return;
    }

    // Sin WhatsApp configurado: único canal disponible es el backend (email/webhook).
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          formRenderedAt: renderedAtRef.current,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (response.status === 422 && data.fields) {
          setErrors(data.fields);
          setStatus("error");
          setErrorMessage(t.contactForm.errors.fieldsError);
          return;
        }
        if (response.status === 429) {
          setStatus("error");
          setErrorMessage(t.contactForm.errors.rateLimited);
          return;
        }
        throw new Error("request_failed");
      }

      trackEvent("contact_form_submit", { need: values.need, channel: "email" });
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
      setErrorMessage(t.contactForm.errors.generic);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="glass flex flex-col items-center gap-3 rounded-lg p-10 text-center"
      >
        <CheckCircle2 size={40} className="text-accent-2" strokeWidth={1.5} />
        <h3 className="font-display text-xl font-semibold text-foreground">
          {site.whatsapp.isConfigured ? t.contactForm.success.whatsappTitle : t.contactForm.success.emailTitle}
        </h3>
        <p className="max-w-sm text-sm text-foreground-muted">
          {site.whatsapp.isConfigured ? t.contactForm.success.whatsappBody : t.contactForm.success.emailBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent hover:text-accent-hover"
        >
          {t.contactForm.success.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot anti-spam: oculto para personas, visible para bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">{t.contactForm.honeypotLabel}</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            {t.contactForm.labels.name} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            {t.contactForm.labels.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
            {t.contactForm.labels.company} <span className="text-muted">{t.contactForm.labels.optional}</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={values.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-foreground">
            {t.contactForm.labels.whatsapp} <span className="text-muted">{t.contactForm.labels.optional}</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={values.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="need" className="mb-2 block text-sm font-medium text-foreground">
          {t.contactForm.labels.need} *
        </label>
        <select
          id="need"
          name="need"
          required
          value={values.need}
          onChange={(e) => handleChange("need", e.target.value)}
          aria-invalid={Boolean(errors.need)}
          aria-describedby={errors.need ? "need-error" : undefined}
          className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        >
          <option value="" disabled>
            {t.contactForm.placeholderSelect}
          </option>
          {NEED_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.need && (
          <p id="need-error" className="mt-1.5 text-xs text-red-400">
            {errors.need}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          {t.contactForm.labels.message} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-none rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <div role="alert" className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t.contactForm.submitting}
          </>
        ) : (
          <>{t.contactForm.submit} →</>
        )}
      </button>
    </form>
  );
}
