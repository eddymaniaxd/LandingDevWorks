/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_WHATSAPP_MESSAGE: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_LINKEDIN_URL: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
  readonly PUBLIC_BOOKING_URL: string;
  readonly PUBLIC_INTRO_VIDEO_URL: string;
  readonly GMAIL_USER: string;
  readonly GMAIL_APP_PASSWORD: string;
  readonly CONTACT_EMAIL_TO: string;
  readonly CONTACT_FORM_WEBHOOK_URL: string;
  readonly CONTACT_FORM_RATE_LIMIT_MAX: string;
  readonly CONTACT_FORM_RATE_LIMIT_WINDOW_MS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
