import { createHash } from "node:crypto";

const FORM_OPENINGS = {
  "free-class": Date.parse(process.env.FREE_CLASS_FORM_OPENS_AT || "2026-08-04T00:00:00-03:00"),
  waitlist: Date.parse(process.env.WAITLIST_FORM_OPENS_AT || "2026-08-15T00:00:00-03:00"),
};
const IP_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const IP_RATE_LIMIT_MAX = 8;
const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_RATE_LIMIT_MAX = 3;
const MIN_FORM_TIME_MS = 2500;
const MAX_FIELD_LENGTHS = { name: 80, surname: 80, email: 254, whatsapp: 20 };
const SAFE_NAME_PATTERN = /[^\p{L}\p{M}\s'.-]/gu;
const CONTROL_CHARS_PATTERN = /[\u0000-\u001f\u007f]/g;
const rateLimitStore = new Map();

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  },
  body: JSON.stringify(body),
});

const getIp = (event) => {
  const headers = event.headers || {};
  const forwarded = headers["x-forwarded-for"] || headers["X-Forwarded-For"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return headers["client-ip"] || headers["x-nf-client-connection-ip"] || "unknown";
};

const normalize = (value) => String(value || "").trim();
const sanitizeName = (value) => normalize(value)
  .replace(CONTROL_CHARS_PATTERN, "")
  .replace(SAFE_NAME_PATTERN, "")
  .replace(/\s+/g, " ")
  .slice(0, MAX_FIELD_LENGTHS.name);
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
const validPhone = (phone) => !phone || /^[\d\s()+.-]{8,20}$/.test(phone);

const hashValue = (value) => createHash("sha256").update(String(value || "unavailable")).digest("hex").slice(0, 16);

const isMemoryRateLimited = (key, max, windowMs) => {
  const now = Date.now();
  const current = rateLimitStore.get(key) || { count: 0, resetAt: now + windowMs };
  if (current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  rateLimitStore.set(key, current);
  return current.count > max;
};

const rateLimitCommand = async (command) => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const commandPath = command.map((part) => encodeURIComponent(String(part))).join("/");
  const response = await fetch(`${url.replace(/\/$/, "")}/${commandPath}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Rate limit store respondeu ${response.status}`);
  return response.json();
};

const isRateLimited = async ({ scope, value, max, windowMs }) => {
  const key = `lead-rate:${scope}:${hashValue(value)}`;
  const increment = await rateLimitCommand(["INCR", key]);
  if (increment) {
    const count = Number(increment.result || 0);
    if (count === 1) await rateLimitCommand(["EXPIRE", key, Math.ceil(windowMs / 1000)]);
    return count > max;
  }
  return isMemoryRateLimited(key, max, windowMs);
};

const logEvent = (level, eventName, details = {}) => {
  const safeDetails = { ...details };
  if (safeDetails.ip) {
    safeDetails.ipHash = hashValue(safeDetails.ip);
    delete safeDetails.ip;
  }
  const logger = level === "error" ? "error" : level === "warn" ? "warn" : "info";
  console[logger](JSON.stringify({ event: eventName, ...safeDetails }));
};

const normalizeBrazilPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return `+${digits.startsWith("55") ? digits : `55${digits}`}`;
};

const verifyTurnstile = async (token, ip) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY não configurada");
  if (!token) return false;

  const payload = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") payload.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload,
  });
  const result = await response.json().catch(() => ({}));
  const configuredHosts = (process.env.TURNSTILE_ALLOWED_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  const allowedHosts = new Set(["vendaslataov2.netlify.app", ...configuredHosts]);
  return Boolean(result.success) && allowedHosts.has(String(result.hostname || "").toLowerCase());
};

const sendToBrevo = async ({ formType, name, surname, email, whatsapp }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdKey = formType === "waitlist" ? "BREVO_WAITLIST_LIST_ID" : "BREVO_LIST_ID";
  const listId = Number(process.env[listIdKey]);
  const whatsappAttribute = process.env.BREVO_WHATSAPP_ATTRIBUTE || "";
  if (!apiKey) throw new Error("BREVO_API_KEY não configurada");
  if (!Number.isInteger(listId) || listId <= 0) throw new Error(`${listIdKey} inválido`);

  const attributes = { NOME: [name, surname].filter(Boolean).join(" ") };
  if (whatsapp && whatsappAttribute) attributes[whatsappAttribute] = normalizeBrazilPhone(whatsapp);
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({ email, attributes, listIds: [listId], updateEnabled: true }),
  });
  if (!response.ok) throw new Error(`Brevo respondeu ${response.status}`);
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { ...json(405, { ok: false, message: "Método não permitido" }), headers: { ...json(405, {}).headers, Allow: "POST" } };
  }

  const ip = getIp(event);
  try {
    const form = new URLSearchParams(event.body || "");
    const formType = normalize(form.get("formType")) || "free-class";
    if (!Object.hasOwn(FORM_OPENINGS, formType)) return json(400, { ok: false, message: "Formulário inválido." });
    if (Date.now() < FORM_OPENINGS[formType]) {
      const message = formType === "waitlist" ? "A lista da próxima turma ainda não está aberta." : "As inscrições para a aula ainda não estão abertas.";
      return json(403, { ok: false, message });
    }
    if (await isRateLimited({ scope: `ip:${formType}`, value: ip, max: IP_RATE_LIMIT_MAX, windowMs: IP_RATE_LIMIT_WINDOW_MS })) {
      logEvent("warn", "lead_rate_limited", { ip, scope: "ip", formType });
      return json(429, { ok: false, message: "Muitas tentativas. Tente novamente mais tarde." });
    }

    if (normalize(form.get("email_address_check"))) {
      logEvent("warn", "lead_honeypot_hit", { ip, formType });
      return json(200, { ok: true });
    }

    const startedAt = Number(form.get("formStartedAt") || 0);
    if (!startedAt || Date.now() - startedAt < MIN_FORM_TIME_MS) {
      logEvent("warn", "lead_fast_submit", { ip, formType });
      return json(400, { ok: false, message: "Envio não validado." });
    }

    const name = sanitizeName(form.get("name"));
    const surname = sanitizeName(form.get("surname")).slice(0, MAX_FIELD_LENGTHS.surname);
    const email = normalize(form.get("email")).toLowerCase().slice(0, MAX_FIELD_LENGTHS.email);
    const whatsapp = normalize(form.get("whatsapp")).slice(0, MAX_FIELD_LENGTHS.whatsapp);
    const consent = form.get("privacyConsent") === "yes";
    const turnstileToken = normalize(form.get("turnstileToken"));
    const waitlistFieldsInvalid = formType === "waitlist" && (!surname || !whatsapp);
    if (!name || !email || !validEmail(email) || !validPhone(whatsapp) || !consent || waitlistFieldsInvalid) {
      logEvent("warn", "lead_invalid_fields", { ip, formType });
      return json(400, { ok: false, message: "Dados inválidos." });
    }

    if (!await verifyTurnstile(turnstileToken, ip)) {
      logEvent("warn", "lead_turnstile_failed", { ip, formType });
      return json(403, { ok: false, message: "Verificação anti-bot falhou." });
    }
    if (await isRateLimited({ scope: `email:${formType}`, value: email, max: EMAIL_RATE_LIMIT_MAX, windowMs: EMAIL_RATE_LIMIT_WINDOW_MS })) {
      logEvent("warn", "lead_rate_limited", { ip, scope: "email", formType, emailHash: hashValue(email) });
      return json(429, { ok: false, message: "Muitas tentativas para este e-mail. Tente novamente mais tarde." });
    }

    await sendToBrevo({ formType, name, surname, email, whatsapp });
    logEvent("info", "lead_created", { ip, formType });
    return json(200, { ok: true });
  } catch (error) {
    logEvent("error", "lead_submit_error", { ip, error: error instanceof Error ? error.message : "unknown" });
    return json(502, { ok: false, message: "Não foi possível concluir a inscrição." });
  }
};
