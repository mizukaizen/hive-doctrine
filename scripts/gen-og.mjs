import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'og.png');

const html = `<!DOCTYPE html>
<html><head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400&family=Inter:wght@400&display=swap');
  * { margin: 0; padding: 0; }
  body { width: 1200px; height: 630px; background: #FAFAF8; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .hex { color: #9B7B3C; margin-bottom: 32px; }
  h1 { font-family: 'Newsreader', Georgia, serif; font-size: 52px; font-weight: 400; color: #111827; letter-spacing: -1.5px; margin-bottom: 16px; }
  p { font-family: 'Inter', system-ui, sans-serif; font-size: 16px; font-weight: 400; color: #9CA3AF; letter-spacing: 4px; text-transform: uppercase; }
</style>
</head><body>
  <div class="hex">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"/>
    </svg>
  </div>
  <h1>The Hive Doctrine</h1>
  <p>Polytheistic AI Safety</p>
</body></html>`;

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();
console.log('OG image saved to', outPath);
