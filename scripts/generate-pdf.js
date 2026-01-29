import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  const publicDir = join(__dirname, '../public');
  const distDir = join(__dirname, '../dist');

  console.log('🚀 Starting PDF generation...\n');

  // Start a simple HTTP server
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: distDir
    });
  });

  await new Promise((resolve) => server.listen(4399, resolve));
  console.log('📡 Server started on port 4399\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Generate both Spanish and English versions
  const versions = [
    {
      lang: 'es',
      filename: 'cv.pdf',
      label: 'Spanish',
      url: 'http://localhost:4399/resume-print/'
    },
    {
      lang: 'en',
      filename: 'cv-en.pdf',
      label: 'English',
      url: 'http://localhost:4399/resume-print-en/'
    }
  ];

  for (const version of versions) {
    const page = await browser.newPage();
    const outputPath = join(publicDir, version.filename);

    try {
      // Navigate to the page and wait for network to be idle
      await page.goto(version.url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for fonts to load (including Font Awesome icons)
      await page.evaluateHandle('document.fonts.ready');

      // Wait for Font Awesome icons to render
      await page.waitForSelector('.fa-envelope', { timeout: 10000 }).catch(() => {
        console.log(`   ⚠️  Font Awesome icons may not have loaded`);
      });

      // Extra wait for rendering
      await new Promise(r => setTimeout(r, 2000));

      // Generate PDF with margins
      await page.pdf({
        path: outputPath,
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.6in',
          right: '0.6in',
          bottom: '0.6in',
          left: '0.6in'
        }
      });

      console.log(`✅ ${version.label} PDF: /public/${version.filename}`);
    } catch (error) {
      console.error(`❌ Error generating ${version.label} PDF:`, error.message);
    }

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('\n📡 Server stopped');
  console.log('\n✨ PDF generation complete!');
}

generatePDF().catch(console.error);
