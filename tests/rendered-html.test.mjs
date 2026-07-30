import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
}

test("Next.js prerenders the Forno de Latão sales page", async () => {
  const html = await render();
  assert.match(html, /<title>Forno de Latão — Mentoria com Amanda Maciel<\/title>/i);
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
  assert.match(html, /assets\/favicon-32\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the mobile-first sales interactions and Netlify config in source", async () => {
  const [page, css, layout, packageJson, netlify, forms] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
    readFile(new URL("../public/__forms.html", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<details className="module-row"/);
  assert.match(page, /className="audience-track"/);
  assert.match(page, /className="whatsapp-float"/);
  assert.match(page, /className="hero-highlights"/);
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
  assert.match(css, /amanda-convidativa\.jpg/);
  assert.match(css, /Mobile is the default/);
  assert.match(css, /min-height: max\(100svh, 850px\)/);
  assert.match(css, /hero-mobile-forno\.jpg/);
  assert.match(css, /hero-desktop-coletivo\.jpg/);
  assert.match(css, /problema-ceramicas\.jpg/);
  assert.match(css, /condicao-especial-materiais\.jpg/);
  assert.doesNotMatch(css, /content:\s*["'][↗×]["']/);
  assert.match(css, /\.site-header/);
  assert.match(css, /\.audience-track/);
  assert.match(css, /\.module-row summary/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /Forno de Latão — Mentoria com Amanda Maciel/);
  assert.match(layout, /apple-touch-icon\.png/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(netlify, /publish = "\.next"/);
  assert.match(page, /fetch\("\/__forms\.html"/);
  assert.match(forms, /name="lista-proxima-turma"/);
  assert.match(forms, /data-netlify="true"/);
  assert.match(forms, /data-netlify-recaptcha="true"/);
  assert.match(forms, /name="whatsapp"/);
});
