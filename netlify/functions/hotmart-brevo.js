import { createHash, timingSafeEqual } from "node:crypto";

const MAX_BODY_BYTES = 256 * 1024;
const SUPPORTED_VERSION = "2.0.0";
const CONTACT_EVENTS = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);
const MAX_NAME_LENGTH = 160;
const SAFE_NAME_PATTERN = /[^\p{L}\p{M}\s'.-]/gu;
const CONTROL_CHARS_PATTERN = /[\u0000-\u001f\u007f]/g;

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  },
  body: JSON.stringify(body),
});

const getHeader = (headers, name) => {
  const target = name.toLowerCase();
  const entry = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === target);
  return entry ? String(entry[1] || "") : "";
};

const constantTimeEqual = (received, expected) => {
  const receivedDigest = createHash("sha256").update(String(received || "")).digest();
  const expectedDigest = createHash("sha256").update(String(expected || "")).digest();
  return timingSafeEqual(receivedDigest, expectedDigest);
};

const hashValue = (value) => createHash("sha256")
  .update(String(value || "unavailable"))
  .digest("hex")
  .slice(0, 16);

const normalize = (value) => String(value || "").trim();
const normalizeEmail = (value) => normalize(value).toLowerCase().slice(0, 254);
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
const sanitizeName = (value) => normalize(value)
  .replace(CONTROL_CHARS_PATTERN, "")
  .replace(SAFE_NAME_PATTERN, "")
  .replace(/\s+/g, " ")
  .slice(0, MAX_NAME_LENGTH);

const normalizePhone = (phone, areaCode, countryIso) => {
  const raw = normalize(phone);
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  if (String(countryIso || "").toUpperCase() === "BR") {
    const ddd = String(areaCode || "").replace(/\D/g, "").slice(0, 2);
    const localNumber = digits.length <= 9 && ddd && !digits.startsWith(ddd) ? `${ddd}${digits}` : digits;
    if (/^55\d{10,11}$/.test(localNumber)) return `+${localNumber}`;
    if (/^\d{10,11}$/.test(localNumber)) return `+55${localNumber}`;
    return "";
  }

  if ((raw.startsWith("+") || digits.length >= 11) && /^\d{8,15}$/.test(digits)) return `+${digits}`;
  return "";
};

const allowedProductIds = () => new Set(
  normalize(process.env.HOTMART_PRODUCT_IDS)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);

const logEvent = (level, eventName, details = {}) => {
  const logger = level === "error" ? "error" : level === "warn" ? "warn" : "info";
  console[logger](JSON.stringify({ event: eventName, ...details }));
};

const addBuyerToBrevo = async ({ email, name, phone }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.HOTMART_BUYERS_LIST_ID);
  const whatsappAttribute = normalize(process.env.BREVO_WHATSAPP_ATTRIBUTE);
  if (!apiKey) throw new Error("BREVO_API_KEY não configurada");
  if (!Number.isInteger(listId) || listId <= 0) throw new Error("HOTMART_BUYERS_LIST_ID inválido");

  const attributes = {};
  if (name) attributes.NOME = name;
  if (phone && whatsappAttribute) attributes[whatsappAttribute] = phone;

  const body = { email, listIds: [listId], updateEnabled: true };
  if (Object.keys(attributes).length) body.attributes = attributes;

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`Brevo respondeu ${response.status}`);
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      ...json(405, { ok: false, message: "Método não permitido" }),
      headers: { ...json(405, {}).headers, Allow: "POST" },
    };
  }

  try {
    const hottok = process.env.HOTMART_HOTTOK;
    if (!hottok) throw new Error("HOTMART_HOTTOK não configurado");
    if (!constantTimeEqual(getHeader(event.headers, "x-hotmart-hottok"), hottok)) {
      logEvent("warn", "hotmart_webhook_unauthorized");
      return json(401, { ok: false, message: "Não autorizado" });
    }

    const contentType = getHeader(event.headers, "content-type").toLowerCase();
    if (!contentType.includes("application/json")) return json(415, { ok: false, message: "Formato não suportado" });

    const rawBody = event.isBase64Encoded
      ? Buffer.from(String(event.body || ""), "base64").toString("utf8")
      : String(event.body || "");
    if (!rawBody || Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return json(413, { ok: false, message: "Conteúdo inválido" });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return json(400, { ok: false, message: "JSON inválido" });
    }

    if (!payload || typeof payload !== "object" || payload.version !== SUPPORTED_VERSION) {
      return json(400, { ok: false, message: "Versão inválida" });
    }

    const eventName = normalize(payload.event);
    if (!CONTACT_EVENTS.has(eventName)) {
      logEvent("info", "hotmart_webhook_ignored", { hotmartEvent: eventName || "unknown" });
      return json(200, { ok: true, ignored: true });
    }

    const products = allowedProductIds();
    if (!products.size) throw new Error("HOTMART_PRODUCT_IDS não configurado");
    const productId = normalize(payload.data?.product?.id);
    const productUcode = normalize(payload.data?.product?.ucode);
    if (!products.has(productId) && (!productUcode || !products.has(productUcode))) {
      logEvent("warn", "hotmart_product_ignored", { hotmartEvent: eventName, productId: productId || "unknown" });
      return json(200, { ok: true, ignored: true });
    }

    const buyer = payload.data?.buyer || {};
    const email = normalizeEmail(buyer.email);
    if (!validEmail(email)) return json(400, { ok: false, message: "Comprador sem e-mail válido" });

    const name = sanitizeName(buyer.name || [buyer.first_name, buyer.last_name].filter(Boolean).join(" "));
    const phone = normalizePhone(
      buyer.checkout_phone,
      buyer.checkout_phone_code,
      payload.data?.purchase?.checkout_country?.iso,
    );

    await addBuyerToBrevo({ email, name, phone });
    logEvent("info", "hotmart_buyer_synced", {
      hotmartEvent: eventName,
      eventId: normalize(payload.id).slice(0, 100) || "unknown",
      productId,
      emailHash: hashValue(email),
    });
    return json(200, { ok: true });
  } catch (error) {
    logEvent("error", "hotmart_webhook_error", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return json(502, { ok: false, message: "Integração temporariamente indisponível" });
  }
};
