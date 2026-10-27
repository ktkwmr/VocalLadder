#!/usr/bin/env node
// Takes the app screenshots used in the guide page:
//   public/vocalladder/images/guide/{en,ja}-{overview,phone}.png
// Requires Playwright, as for scripts/render-og-image.mjs:
//   npm install --no-save playwright && npx playwright install chromium
//   (or: npm install --no-save playwright-core, and set PW_CHANNEL=msedge or chrome)
// Then:
//   node scripts/render-guide-images.mjs
// Re-run it when the app's look changes.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = await import("playwright").catch(() => import("playwright-core"));
const PUBLIC = fileURLToPath(new URL("../public/", import.meta.url));
const OUT = join(PUBLIC, "vocalladder/images/guide/");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".md": "text/markdown; charset=utf-8" };
const PATH = { en: "/vocalladder/?lang=en", ja: "/vocalladder/ja/" };

// Minimal static server for public/ (the app needs http:// for its absolute paths)
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = normalize(join(PUBLIC, path));
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// Numbered markers drawn next to controls, matching the numbered list in the guide.
// side: "left" | "right" | "inside" (top-right corner of the element) | "below" (under the left edge)
async function addMarkers(page, targets) {
  await page.evaluate((targets) => {
    targets.forEach(([sel, n, side]) => {
      const el = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
      if (!el) throw new Error("marker target not found: " + sel);
      const r = el.getBoundingClientRect();
      const m = document.createElement("div");
      m.textContent = n;
      const size = 22;
      const x = side === "left" ? r.left - size - 4 : side === "inside" ? r.right - size - 6 : side === "below" ? r.left : r.right + 4;
      const y = side === "inside" ? r.top + 6 : side === "below" ? r.bottom + 4 : r.top + r.height / 2 - size / 2;
      Object.assign(m.style, {
        position: "absolute", left: x + scrollX + "px", top: y + scrollY + "px", width: size + "px", height: size + "px", zIndex: 99999,
        borderRadius: "50%", background: "#e11d48", color: "#fff", font: "700 13px/22px system-ui, sans-serif",
        textAlign: "center", boxShadow: "0 0 0 2px #fff", pointerEvents: "none",
      });
      document.body.appendChild(m);
    });
  }, targets);
}

// Example practice set, saved in the browser before the app opens
const SET = { en: "Soprano – morning", ja: "ソプラノ・朝の練習" };
const exampleState = (lang) => ({
  v: 2,
  sets: [{
    id: "s1", name: SET[lang], current: "a",
    items: [
      { id: "a", pattern: "1 2 3 4 5 4 3 2 1-", start: 60, end: 67, bpm: 120 },
      { id: "b", pattern: "1 3 5 3 1-", start: 60, end: 69, round: true, bpm: 112 },
      { id: "c", pattern: "1 3 5 8 10 12 11 9 7 5 4 2 1-", start: 57, end: 62, bpm: 96 },
      { id: "d", pattern: "5 4 3 2 1-", start: 72, end: 65, bpm: 120 },
    ],
  }],
  patterns: [], current: "s1", sound: "piano", vol: 0.8, through: true,
});
async function setUp(page, lang) {
  await page.addInitScript((state) => {
    try { localStorage.setItem("vocalladder-state", JSON.stringify(state)); } catch (e) {}
  }, exampleState(lang));
  await page.goto(origin + PATH[lang]);
  await page.waitForTimeout(200);
}

const launch = { channel: process.env.PW_CHANNEL || undefined };
const browser = await chromium.launch(launch);
await mkdir(OUT, { recursive: true });
for (const lang of ["en", "ja"]) {
  // 1. Computer, the app with numbered controls (without the explanation below it)
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang);
    await addMarkers(page, [
      ["#setSel", "1", "right"],
      ["#items", "2", "right"],
      ["#dupBtn", "3", "left"],
      ["#nameInput", "4", "below"],
      ["#keyName", "5", "right"],
      ["#patView", "6", "right"],
      ["#ladder", "7", "right"],
      ["#playBtn", "8", "inside"],
      ["#presetSel", "9", "inside"],
      ["#patInput", "10", "inside"],
      ["#startSel", "11", "inside"],
      ["#roundBtn", "12", "right"],
      ["label[for=bpmSlider] > span", "13", "right"],
      ["#listenBtn", "14", "right"],
      ["#throughBtn", "15", "right"],
      ["#settingsBtn", "16", "left"],
    ]);
    const box = await page.locator(".layout").boundingBox();
    await page.screenshot({ path: join(OUT, `${lang}-overview.png`), fullPage: true, clip: { x: 0, y: 0, width: 1200, height: Math.ceil(box.y + box.height + 16) } });
    await ctx.close();
  }
  // 2. Phone, the top of the screen
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang);
    await page.screenshot({ path: join(OUT, `${lang}-phone.png`) });
    await ctx.close();
  }
  console.log(`Wrote the ${lang} screenshots`);
}
await browser.close();
server.close();
