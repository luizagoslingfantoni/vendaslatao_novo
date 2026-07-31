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
  assert.match(html, /Quer saber quando uma nova turma/);
  assert.match(html, /name="lista-proxima-turma"/);
  assert.match(html, /Design e desenvolvimento por Estúdio Taú · tauestudio\.com\.br/);
  assert.match(html, /https:\/\/tauestudio\.com\.br/);
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

test("keeps the mobile-first sales interactions and Netlify config in source", async () => {
  const [page, css, layout, packageJson, netlify, forms, privacy] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
    readFile(new URL("../public/__forms.html", import.meta.url), "utf8"),
    readFile(new URL("../public/privacidade-termos.html", import.meta.url), "utf8"),
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
  assert.match(page, /className="waitlist-form"/);
  assert.match(page, /className="waitlist section-pad" aria-labelledby="waitlist-title" hidden/);
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
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.problem-copy > p,[\s\S]*font-size:\s*15px/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.faq-list details > p \{ font-size:\s*13px/);
  assert.match(css, /min-height: max\(100svh, 850px\)/);
  assert.match(css, /hero-mobile-vasos\.jpg/);
  assert.match(css, /hero-desktop-coletivo\.jpg/);
  assert.match(css, /problema-ceramicas\.jpg/);
  assert.match(css, /condicao-especial-materiais\.jpg/);
  assert.doesNotMatch(css, /content:\s*["'][↗×]["']/);
  assert.match(css, /\.site-header/);
  assert.match(css, /\.audience-track/);
  assert.match(css, /\.module-row summary/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /Forno de Latão • Mentoria online com Amanda Maciel/);
  assert.match(layout, /hero-desktop-coletivo\.jpg\?v=20260730/);
  assert.doesNotMatch(layout, /og\.png/);
  assert.match(layout, /apple-touch-icon\.png/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(netlify, /publish = "out"/);
  assert.match(netlify, /Content-Security-Policy/);
  assert.match(netlify, /frame-ancestors 'none'/);
  assert.match(netlify, /Permissions-Policy/);
  assert.match(netlify, /X-Frame-Options = "DENY"/);
  assert.match(page, /fetch\("\/__forms\.html"/);
  assert.match(forms, /name="lista-proxima-turma"/);
  assert.match(forms, /data-netlify="true"/);
  assert.doesNotMatch(privacy, /fonts\.(googleapis|gstatic)\.com/);
  assert.match(forms, /data-netlify-recaptcha="true"/);
  assert.match(forms, /name="whatsapp"/);
});
