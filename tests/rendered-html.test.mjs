import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../out/index.html", import.meta.url), "utf8");
}

test("Next.js prerenders the Forno de Latão sales page", async () => {
  const html = await render();
  assert.match(html, /<title>Forno de Latão • Mentoria online com Amanda Maciel<\/title>/i);
  assert.match(html, /Construa seu próprio/);
  assert.match(html, /Da construção do forno às primeiras queimas/);
  assert.match(html, /Ao final da mentoria/);
  assert.match(html, /Tudo o que você recebe/);
  assert.match(html, /experiência presencial/);
  assert.match(html, /Acompanhando duas queimas coletivas em tempo real/);
  assert.match(html, /Ter um forno de latão amplia as possibilidades da prática cerâmica/);
  assert.match(html, /Vagas sociais/);
  assert.match(html, /2 vagas com 80% de desconto para multiplicadores do conhecimento/);
  assert.match(html, /Ex-alunos de mentorias e oficinas presenciais:[\s\S]*15% de desconto/);
  assert.match(html, /Ex-alunos de cursos e aulas online:[\s\S]*5% de desconto/);
  assert.match(html, /https:\/\/forms\.gle\/H28ag11q2wUpd4Zr7/);
  assert.doesNotMatch(html, /de R\$ 750 por|R\$ 600/);
  assert.doesNotMatch(html, /Quer saber quando uma nova turma|lista-proxima-turma|g-recaptcha/);
  assert.match(html, /Design e desenvolvimento por Estúdio Taú · tauestudio\.com\.br/);
  assert.match(html, /https:\/\/tauestudio\.com\.br/);
  assert.match(html, /www\.youtube-nocookie\.com\/embed\/Sj7uvQfgdOM/);
  assert.match(html, /Mentoria Forno de Latão com Amanda Maciel/);
  assert.match(html, /galeria-alta-temperatura\.jpg/);
  assert.match(html, /Raku nu/);
  assert.match(html, /Saggar/);
  assert.match(html, /Sara S\. · Mentoria Forno de Latão/);
  assert.match(html, /Bárbara G\. · Mentoria Forno de Latão/);
  assert.match(html, /Anna T\. · Mentoria Forno de Latão/);
  assert.match(html, /Fazer cerâmica em casa é um sonho realizado/);
  assert.doesNotMatch(html, /depoimento-whatsapp|Print de depoimento/);
  assert.match(html, /assets\/favicon-32\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the mobile-first sales interactions and protected integrations in source", async () => {
  const [page, css, layout, packageJson, netlify, privacy, leadFunction, hotmartFunction, dependabot, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
    readFile(new URL("../public/privacidade-termos.html", import.meta.url), "utf8"),
    readFile(new URL("../netlify/functions/lead.js", import.meta.url), "utf8"),
    readFile(new URL("../netlify/functions/hotmart-brevo.js", import.meta.url), "utf8"),
    readFile(new URL("../.github/dependabot.yml", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/quality.yml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<details className="module-row"/);
  assert.match(page, /className="audience-track"/);
  assert.match(page, /className="whatsapp-float"/);
  assert.match(page, /assets\/whatsapp\.svg/);
  assert.doesNotMatch(page, /cdn\.simpleicons\.org/);
  assert.match(page, /className="hero-highlights"/);
  assert.match(page, /const testimonials = \[/);
  assert.match(page, /testimonials\.map/);
  assert.match(page, /className="testimonial-carousel"/);
  assert.match(page, /moveTestimonials\(-1\)/);
  assert.match(page, /moveTestimonials\(1\)/);
  assert.match(page, /className="back-to-top"[^>]*><ArrowUp/);
  assert.doesNotMatch(page, /testimonialScreenshots|testimonial-screenshot/);
  assert.match(page, /27h de aulas ao vivo/);
  assert.doesNotMatch(page, /className="manifesto/);
  assert.doesNotMatch(page, /data-netlify-recaptcha|__forms\.html/);
  assert.match(page, /function FreeClassSignup/);
  assert.match(page, /previewOnly = false/);
  assert.match(page, /get\("preview"\) === "aula-gratuita"/);
  assert.match(page, /Prévia visual — os envios serão liberados em 4 de agosto/);
  assert.match(page, /Conheça o forno de latão usado pela/);
  assert.match(page, /Amanda Maciel apresenta o forno que utiliza no ateliê/);
  assert.match(page, /Tenha uma prévia da abordagem da mentoria/);
  assert.match(page, /Quero conhecer o forno/);
  assert.match(page, /function WaitlistSignup/);
  assert.match(page, /2026-08-04T00:00:00-03:00/);
  assert.match(page, /2026-08-15T00:00:00-03:00/);
  assert.match(page, /freeClassFormOpen && <FreeClassSignup/);
  assert.match(page, /problem-visual[\s\S]*freeClassFormOpen && <FreeClassSignup[\s\S]*<section className="pillars/);
  assert.match(page, /waitlistOpen && <WaitlistSignup/);
  assert.match(page, /id="proxima-turma"/);
  assert.match(page, /name="formType" value="free-class"/);
  assert.match(page, /name="formType" value="waitlist"/);
  assert.match(page, /name="surname"/);
  assert.match(page, /const conversionHref = waitlistOpen \? "#proxima-turma" : checkoutUrl/);
  assert.match(page, /\{!waitlistOpen && <section className="offer/);
  assert.match(page, /\{!waitlistOpen && <small>/);
  assert.match(page, /\{!waitlistOpen && <p className="final-dates"/);
  assert.match(page, /\/\.netlify\/functions\/lead/);
  assert.match(page, /privacyConsent/);
  assert.match(page, /email_address_check/);
  assert.match(page, /formStartedAt/);
  assert.match(page, /turnstileToken/);
  assert.match(page, /0x4AAAAAADp702-3DV1oukX8/);
  assert.match(css, /\.final-button[^}]*font-weight:\s*700/);
  assert.match(page, /logo-kuara-white\.png/);
  assert.match(page, /logo-kuara-brown\.png/);
  assert.doesNotMatch(page, /<details key=\{question\} open=/);
  assert.match(page, /experiência presencial<\/em>/);
  assert.match(page, /<strong className="keep-together">mais autonomia\.<\/strong>/);
  assert.match(css, /socialSlide 18s infinite/);
  assert.match(page, /className="installment-intro">Em até/);
  assert.match(page, /className="installment-count">12x/);
  assert.match(page, /className="installment-amount">165,17/);
  assert.doesNotMatch(page, /[⟶↗↑×]/);
  assert.match(page, /amanda-convidativa\.jpg/);
  assert.match(page, /className="teacher-photo"/);
  assert.match(page, /width="1600"/);
  assert.match(page, /height="2000"/);
  assert.doesNotMatch(page, /teacher-photo parallax-medium/);
  assert.match(css, /Mobile is the default/);
  assert.match(css, /Mobile reading scale/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.problem-copy > p,[\s\S]*font-size:\s*17\.5px/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.faq-list details > p \{ font-size:\s*15\.5px/);
  assert.match(css, /min-height: max\(100svh, 850px\)/);
  assert.match(css, /hero-mobile-vasos\.jpg/);
  assert.match(css, /hero-desktop-coletivo\.jpg/);
  assert.match(css, /problema-forno-aceso\.jpg/);
  assert.doesNotMatch(css, /problema-ceramicas\.jpg/);
  assert.match(css, /condicao-especial-materiais\.jpg/);
  assert.doesNotMatch(css, /content:\s*["'][↗×]["']/);
  assert.match(css, /\.site-header/);
  assert.match(css, /\.audience-track/);
  assert.match(css, /\.module-row summary/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /Forno de Latão • Mentoria online com Amanda Maciel/);
  assert.match(layout, /https:\/\/mentoria\.kuaraceramicas\.com\.br/);
  assert.match(layout, /canonical: "\/"/);
  assert.match(layout, /openGraph:\s*\{\s*url: "\/"/);
  assert.match(layout, /hero-desktop-coletivo\.jpg\?v=20260730/);
  assert.doesNotMatch(layout, /og\.png/);
  assert.match(layout, /apple-touch-icon\.png/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"postcss": "8\.5\.25"/);
  assert.match(packageJson, /"sharp": "0\.35\.3"/);
  assert.match(netlify, /publish = "out"/);
  assert.match(netlify, /functions = "netlify\/functions"/);
  assert.match(netlify, /node_bundler = "esbuild"/);
  assert.match(netlify, /Content-Security-Policy/);
  assert.match(netlify, /frame-ancestors 'none'/);
  assert.match(netlify, /frame-src https:\/\/www\.youtube-nocookie\.com https:\/\/challenges\.cloudflare\.com/);
  assert.match(netlify, /script-src[^\n]*https:\/\/challenges\.cloudflare\.com/);
  assert.match(netlify, /connect-src[^\n]*https:\/\/challenges\.cloudflare\.com/);
  assert.match(netlify, /Permissions-Policy/);
  assert.match(netlify, /X-Frame-Options = "DENY"/);
  assert.doesNotMatch(netlify, /google\.com|gstatic\.com|recaptcha|\/__forms\.html/);
  assert.doesNotMatch(privacy, /fonts\.(googleapis|gstatic)\.com/);
  assert.match(privacy, /contato@kuaraceramicas\.com\.br/);
  assert.match(privacy, /Prazo de armazenamento/);
  assert.match(privacy, /mantidos enquanto houver consentimento/);
  assert.match(privacy, /formulários para inscrição na aula online gratuita e para manifestação de interesse na próxima turma/);
  assert.match(privacy, /Netlify para hospedagem e processamento seguro do formulário/);
  assert.match(privacy, /Cloudflare Turnstile/);
  assert.match(privacy, /Brevo/);
  assert.match(privacy, /Quando uma compra é aprovada, a Hotmart pode enviar à Kûara/);
  assert.match(privacy, /execução do contrato/);
  assert.match(privacy, /respeita bloqueios e pedidos de descadastro já registrados/);
  assert.match(privacy, /YouTube no modo de privacidade aprimorada/);
  assert.match(leadFunction, /FREE_CLASS_FORM_OPENS_AT/);
  assert.match(leadFunction, /WAITLIST_FORM_OPENS_AT/);
  assert.match(leadFunction, /2026-08-04T00:00:00-03:00/);
  assert.match(leadFunction, /2026-08-15T00:00:00-03:00/);
  assert.match(leadFunction, /Date\.now\(\) < FORM_OPENINGS\[formType\]/);
  assert.match(leadFunction, /TURNSTILE_SECRET_KEY/);
  assert.match(leadFunction, /mentoria\.kuaraceramicas\.com\.br/);
  assert.match(leadFunction, /BREVO_API_KEY/);
  assert.match(leadFunction, /BREVO_LIST_ID/);
  assert.match(leadFunction, /BREVO_WAITLIST_LIST_ID/);
  assert.match(leadFunction, /UPSTASH_REDIS_REST_URL/);
  assert.match(leadFunction, /email_address_check/);
  assert.match(leadFunction, /MIN_FORM_TIME_MS/);
  assert.match(hotmartFunction, /X-HOTMART-HOTTOK|x-hotmart-hottok/);
  assert.match(hotmartFunction, /timingSafeEqual/);
  assert.match(hotmartFunction, /HOTMART_HOTTOK/);
  assert.match(hotmartFunction, /HOTMART_PRODUCT_IDS/);
  assert.match(hotmartFunction, /HOTMART_BUYERS_LIST_ID/);
  assert.match(hotmartFunction, /PURCHASE_APPROVED/);
  assert.match(hotmartFunction, /PURCHASE_COMPLETE/);
  assert.match(hotmartFunction, /updateEnabled: true/);
  assert.doesNotMatch(hotmartFunction, /emailBlacklisted\s*:/);
  assert.match(dependabot, /package-ecosystem: npm/);
  assert.match(dependabot, /interval: weekly/);
  assert.match(workflow, /npm audit --omit=dev --audit-level=high/);
  assert.match(workflow, /npm test/);
});

test("the Hotmart webhook authenticates, filters the product and idempotently syncs buyers to Brevo", async () => {
  process.env.HOTMART_HOTTOK = "test-hottok";
  process.env.HOTMART_PRODUCT_IDS = "213344,product-ucode";
  process.env.HOTMART_BUYERS_LIST_ID = "42";
  process.env.BREVO_API_KEY = "test-brevo-key";
  process.env.BREVO_WHATSAPP_ATTRIBUTE = "WHATSAPP";

  const originalFetch = global.fetch;
  const brevoRequests = [];
  global.fetch = async (url, options) => {
    brevoRequests.push({ url, options });
    return { ok: true, status: 201 };
  };

  try {
    const { handler } = await import("../netlify/functions/hotmart-brevo.js?hotmart-test");
    const payload = {
      id: "event-123",
      event: "PURCHASE_APPROVED",
      version: "2.0.0",
      data: {
        product: { id: 213344, ucode: "product-ucode", name: "Forno de Latão" },
        buyer: {
          email: "Compradora@Example.com",
          name: "Amanda da Silva",
          checkout_phone: "99999-9999",
          checkout_phone_code: "31",
        },
        purchase: { checkout_country: { iso: "BR" } },
      },
    };
    const makeEvent = (body = payload, hottok = "test-hottok") => ({
      httpMethod: "POST",
      headers: { "content-type": "application/json", "x-hotmart-hottok": hottok },
      body: JSON.stringify(body),
    });

    const accepted = await handler(makeEvent());
    assert.equal(accepted.statusCode, 200);
    assert.equal(brevoRequests.length, 1);
    assert.equal(brevoRequests[0].url, "https://api.brevo.com/v3/contacts");
    assert.equal(brevoRequests[0].options.headers["api-key"], "test-brevo-key");
    assert.deepEqual(JSON.parse(brevoRequests[0].options.body), {
      email: "compradora@example.com",
      listIds: [42],
      updateEnabled: true,
      attributes: { NOME: "Amanda da Silva", WHATSAPP: "+5531999999999" },
    });

    const unauthorized = await handler(makeEvent(payload, "wrong-hottok"));
    assert.equal(unauthorized.statusCode, 401);
    assert.equal(brevoRequests.length, 1);

    const otherProduct = structuredClone(payload);
    otherProduct.data.product = { id: 999999, ucode: "other-product" };
    const ignoredProduct = await handler(makeEvent(otherProduct));
    assert.equal(ignoredProduct.statusCode, 200);
    assert.equal(JSON.parse(ignoredProduct.body).ignored, true);
    assert.equal(brevoRequests.length, 1);

    const ignoredEvent = await handler(makeEvent({ ...payload, event: "PURCHASE_REFUNDED" }));
    assert.equal(ignoredEvent.statusCode, 200);
    assert.equal(JSON.parse(ignoredEvent.body).ignored, true);
    assert.equal(brevoRequests.length, 1);
  } finally {
    global.fetch = originalFetch;
  }
});

test("the server blocks both forms before their configured opening times", async () => {
  process.env.FREE_CLASS_FORM_OPENS_AT = "2099-08-04T00:00:00-03:00";
  process.env.WAITLIST_FORM_OPENS_AT = "2099-08-15T00:00:00-03:00";
  const { handler } = await import("../netlify/functions/lead.js?timed-form-test");
  const event = (formType) => ({
    httpMethod: "POST",
    headers: {},
    body: new URLSearchParams({ formType }).toString(),
  });

  const freeClassResponse = await handler(event("free-class"));
  const waitlistResponse = await handler(event("waitlist"));
  const invalidResponse = await handler(event("constructor"));

  assert.equal(freeClassResponse.statusCode, 403);
  assert.equal(waitlistResponse.statusCode, 403);
  assert.equal(invalidResponse.statusCode, 400);
});
