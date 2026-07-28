import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Forno de Latão sales page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Forno de Latão — Mentoria com Amanda Maciel<\/title>/i);
  assert.match(html, /Construa seu próprio/);
  assert.match(html, /Da construção do forno às primeiras queimas/);
  assert.match(html, /Ao final da mentoria/);
  assert.match(html, /Tudo o que você recebe/);
  assert.match(html, /Uma experiência presencial/);
  assert.match(html, /assets\/favicon-32\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the mobile-first sales interactions in source", async () => {
  const [page, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<details className="module-row"/);
  assert.match(page, /className="audience-track"/);
  assert.match(page, /className="whatsapp-float"/);
  assert.match(page, /amanda-placeholder\.jpg|teacher-photo/);
  assert.match(css, /Mobile is the default/);
  assert.match(css, /\.site-header/);
  assert.match(css, /\.audience-track/);
  assert.match(css, /\.module-row summary/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /Forno de Latão — Mentoria com Amanda Maciel/);
  assert.match(layout, /apple-touch-icon\.png/);
});
