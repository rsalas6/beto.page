// Renders every /og/<id>/ page to public/og/<id>.png (1200x630) with Puppeteer.
// Cloudflare has no browser, so the PNGs are generated here and committed.

import { mkdirSync, copyFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const outDir = join(__dirname, '../public/og');

mkdirSync(outDir, { recursive: true });

const pages = readdirSync(join(distDir, 'og'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const server = http.createServer((request, response) =>
  handler(request, response, { public: distDir })
);
await new Promise((resolve) => server.listen(4398, resolve));

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const name of pages) {
  await page.goto(`http://localhost:4398/og/${name}/`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const file = join(outDir, `${name}.png`);
  await page.screenshot({ path: file });
  copyFileSync(file, join(distDir, 'og', `${name}.png`));
  console.log(`✅ /og/${name}.png`);
}

await browser.close();
server.close();
