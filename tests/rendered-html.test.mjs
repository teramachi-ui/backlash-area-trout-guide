import assert from "node:assert/strict";
import { access, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://example.com/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the area-trout guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ja">/i);
  assert.match(html, /エリアトラウト釣り場ガイド/);
  assert.match(html, /いい水、/);
  assert.match(html, /フィッシング＆カフェ サンクチュアリ/);
  assert.match(html, /あいづフィッシングエリア/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("includes the complete venue image set", async () => {
  const venueRoot = new URL("../public/venues/", import.meta.url);
  const files = await readdir(venueRoot);
  const generatedCards = files.filter((file) => /^venue-\d{2}\.webp$/.test(file));

  assert.equal(generatedCards.length, 24);
  await Promise.all([
    access(new URL("sanctuary.webp", venueRoot)),
    access(new URL("mizunami.webp", venueRoot)),
    access(new URL("hirayako.webp", venueRoot)),
    access(new URL("samegai.webp", venueRoot)),
    access(new URL("arcus-yaizu.webp", venueRoot)),
    access(new URL("gozu.webp", venueRoot)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
