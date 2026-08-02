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

test("keeps the mobile-first sales interactions and Netlify config in source", async () => {
  const [page, css, layout, packageJson, netlify, privacy, dependabot, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
    readFile(new URL("../public/privacidade-termos.html", import.meta.url), "utf8"),
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
  assert.doesNotMatch(page, /waitlist|data-netlify-recaptcha|__forms\.html|handleWaitlistSubmit/);
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
  assert.match(layout, /hero-desktop-coletivo\.jpg\?v=20260730/);
  assert.doesNotMatch(layout, /og\.png/);
  assert.match(layout, /apple-touch-icon\.png/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"postcss": "8\.5\.25"/);
  assert.match(packageJson, /"sharp": "0\.35\.3"/);
  assert.match(netlify, /publish = "out"/);
  assert.match(netlify, /Content-Security-Policy/);
  assert.match(netlify, /frame-ancestors 'none'/);
  assert.match(netlify, /frame-src https:\/\/www\.youtube-nocookie\.com/);
  assert.match(netlify, /Permissions-Policy/);
  assert.match(netlify, /X-Frame-Options = "DENY"/);
  assert.doesNotMatch(netlify, /google\.com|gstatic\.com|recaptcha|\/__forms\.html/);
  assert.doesNotMatch(privacy, /fonts\.(googleapis|gstatic)\.com/);
  assert.match(privacy, /contato@kuaraceramicas\.com\.br/);
  assert.match(privacy, /Prazo de armazenamento/);
  assert.match(privacy, /mantidos enquanto houver consentimento/);
  assert.match(privacy, /não possui formulário próprio de captação de leads/);
  assert.match(privacy, /YouTube no modo de privacidade aprimorada/);
  assert.match(dependabot, /package-ecosystem: npm/);
  assert.match(dependabot, /interval: weekly/);
  assert.match(workflow, /npm audit --omit=dev --audit-level=high/);
  assert.match(workflow, /npm test/);
});
