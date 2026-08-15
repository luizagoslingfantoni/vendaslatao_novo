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
  assert.match(html, /Saiba quando uma nova turma/);
  assert.match(html, /E se a queima não dependesse/);
  assert.match(html, /Amanda Maciel/);
  assert.match(html, /Projeto técnico do forno/);
  assert.match(html, /Estudos de caso da turma/);
  assert.match(html, /Ter um forno de latão amplia as possibilidades da prática cerâmica/);
  assert.match(html, /name="formType" value="waitlist"/);
  assert.doesNotMatch(html, /Veja o Forno de Latão em ação/);
  assert.doesNotMatch(html, /Conheça o forno de latão usado pela/);
  assert.doesNotMatch(html, /Mais do que um curso, uma mentoria/);
  assert.doesNotMatch(html, /Da construção do forno às primeiras queimas/);
  assert.doesNotMatch(html, /Veja se esta jornada combina com você/);
  assert.doesNotMatch(html, /Condição especial/);
  assert.doesNotMatch(html, /Sua próxima queima/);
  assert.doesNotMatch(html, /Tudo o que você recebe|Vagas sociais|165,17/);
  assert.doesNotMatch(html, /27h de aulas ao vivo|Aulas gravadas disponíveis por 1 ano/);
  assert.match(html, /Design e desenvolvimento por Estúdio Taú · tauestudio\.com\.br/);
  assert.match(html, /https:\/\/tauestudio\.com\.br/);
  assert.doesNotMatch(html, /assets\/forno-latao-mentoria\.mp4/);
  assert.doesNotMatch(html, /youtube(?:-nocookie)?\.com/i);
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

test("keeps the mobile-first sales interactions and both protected timed forms in source", async () => {
  const [page, css, layout, packageJson, netlify, privacy, leadFunction, dependabot, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
    readFile(new URL("../public/privacidade-termos.html", import.meta.url), "utf8"),
    readFile(new URL("../netlify/functions/lead.js", import.meta.url), "utf8"),
    readFile(new URL("../.github/dependabot.yml", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/quality.yml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="module-grid"/);
  assert.match(page, /className="module-card"/);
  assert.doesNotMatch(page, /<details className="module-row"/);
  assert.doesNotMatch(page, /className="audience-track"/);
  assert.match(page, /className="whatsapp-float"/);
  assert.match(page, /assets\/whatsapp\.svg/);
  assert.doesNotMatch(page, /cdn\.simpleicons\.org/);
  assert.doesNotMatch(page, /className="hero-highlights"/);
  assert.match(page, /const testimonials = \[/);
  assert.match(page, /testimonials\.map/);
  assert.match(page, /className="testimonial-carousel"/);
  assert.match(page, /moveTestimonials\(-1\)/);
  assert.match(page, /moveTestimonials\(1\)/);
  assert.match(page, /className="back-to-top"[^>]*><ArrowUp/);
  assert.doesNotMatch(page, /testimonialScreenshots|testimonial-screenshot/);
  assert.doesNotMatch(page, /27h de aulas ao vivo/);
  assert.doesNotMatch(page, /className="manifesto/);
  assert.doesNotMatch(page, /data-netlify-recaptcha|__forms\.html/);
  assert.match(page, /function FreeClassSignup/);
  assert.match(page, /previewOnly = false/);
  assert.match(page, /Prévia visual — os envios serão liberados em 4 de agosto/);
  assert.match(page, /Conheça o forno de latão usado pela/);
  assert.match(page, /Amanda Maciel apresenta o forno que utiliza no ateliê/);
  assert.match(page, /Tenha uma prévia da abordagem da mentoria/);
  assert.match(page, /Quero conhecer o forno/);
  assert.match(page, /function WaitlistSignup\(\{ variant = "section" \}/);
  assert.match(page, /2026-08-03T00:00:00-03:00/);
  assert.match(page, /2026-08-14T00:00:00-03:00/);
  assert.doesNotMatch(page, /freeClassFormOpen && <FreeClassSignup/);
  assert.match(page, /<WaitlistSignup variant="hero" \/>/);
  assert.match(page, /<WaitlistSignup \/>/);
  assert.match(page, /"proxima-turma"/);
  assert.match(page, /name="formType" value="free-class"/);
  assert.match(page, /name="formType" value="waitlist"/);
  assert.match(page, /name="surname"/);
  assert.match(page, /const waitlistOpen = true/);
  assert.match(page, /const conversionHref = "#proxima-turma"/);
  assert.match(page, /\{!waitlistOpen && <section className="offer/);
  assert.match(page, /\/\.netlify\/functions\/lead/);
  assert.match(page, /privacyConsent/);
  assert.match(page, /email_address_check/);
  assert.match(page, /formStartedAt/);
  assert.match(page, /turnstileToken/);
  assert.doesNotMatch(page, /className="hero-last-spots"/);
  assert.doesNotMatch(page, /Últimas vagas/);
  assert.doesNotMatch(page, /Inscreva-se até 14\/8|Vagas limitadas/);
  assert.match(page, /0x4AAAAAAEFzz82dfHPlJVVM/);
  assert.match(css, /\.final-button[^}]*font-weight:\s*700/);
  assert.match(page, /logo-kuara-white\.png/);
  assert.match(page, /logo-kuara-brown\.png/);
  assert.doesNotMatch(page, /<details key=\{question\} open=/);
  assert.doesNotMatch(page, /experiência presencial<\/em>/);
  assert.doesNotMatch(page, /<strong className="keep-together">mais autonomia\.<\/strong>/);
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
  assert.match(css, /\.hero \{[^}]*min-height:\s*100svh/);
  assert.match(css, /hero-mobile-vasos\.jpg/);
  assert.match(css, /hero-desktop-coletivo\.jpg/);
  assert.match(css, /problema-forno-aceso\.jpg/);
  assert.doesNotMatch(css, /problema-ceramicas\.jpg/);
  assert.doesNotMatch(css, /content:\s*["'][↗×]["']/);
  assert.match(css, /\.site-header/);
  assert.match(css, /\.module-grid/);
  assert.match(css, /grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
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
  assert.match(netlify, /frame-src https:\/\/challenges\.cloudflare\.com/);
  assert.doesNotMatch(netlify, /youtube(?:-nocookie)?\.com/i);
  assert.match(netlify, /script-src[^\n]*https:\/\/challenges\.cloudflare\.com/);
  assert.match(netlify, /connect-src[^\n]*https:\/\/challenges\.cloudflare\.com/);
  assert.match(netlify, /Permissions-Policy/);
  assert.match(netlify, /X-Frame-Options = "DENY"/);
  assert.match(netlify, /NEXT_PUBLIC_GA_ID = "G-324PBG4P1Q"/);
  assert.match(netlify, /https:\/\/www\.googletagmanager\.com/);
  assert.doesNotMatch(netlify, /gstatic\.com|recaptcha|\/__forms\.html/);
  assert.doesNotMatch(privacy, /fonts\.(googleapis|gstatic)\.com/);
  assert.match(privacy, /contato@kuaraceramicas\.com\.br/);
  assert.match(privacy, /Prazo de armazenamento/);
  assert.match(privacy, /mantidos enquanto houver consentimento/);
  assert.match(privacy, /formulários para inscrição na aula online gratuita e para manifestação de interesse na próxima turma/);
  assert.match(privacy, /Netlify para hospedagem e processamento seguro do formulário/);
  assert.match(privacy, /Cloudflare Turnstile/);
  assert.match(privacy, /Brevo/);
  assert.match(privacy, /servido pela própria infraestrutura de hospedagem/);
  assert.match(leadFunction, /FREE_CLASS_FORM_OPENS_AT/);
  assert.match(leadFunction, /WAITLIST_FORM_OPENS_AT/);
  assert.match(leadFunction, /2026-08-03T00:00:00-03:00/);
  assert.match(leadFunction, /2026-08-14T00:00:00-03:00/);
  assert.match(leadFunction, /Date\.now\(\) < FORM_OPENINGS\[formType\]/);
  assert.match(leadFunction, /TURNSTILE_SECRET_KEY/);
  assert.match(leadFunction, /mentoria\.kuaraceramicas\.com\.br/);
  assert.match(leadFunction, /BREVO_API_KEY/);
  assert.match(leadFunction, /BREVO_LIST_ID/);
  assert.match(leadFunction, /BREVO_WAITLIST_LIST_ID/);
  assert.match(leadFunction, /UPSTASH_REDIS_REST_URL/);
  assert.match(leadFunction, /email_address_check/);
  assert.match(leadFunction, /MIN_FORM_TIME_MS/);
  assert.match(dependabot, /package-ecosystem: npm/);
  assert.match(dependabot, /interval: weekly/);
  assert.match(workflow, /npm audit --omit=dev --audit-level=high/);
  assert.match(workflow, /npm test/);
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
