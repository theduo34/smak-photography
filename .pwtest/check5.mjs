import { chromium } from 'playwright';

const browser = await chromium.launch();
const OUT = 'C:/Users/Work/Smak/smak-photography/.pwtest';

async function checkPage(name, url, opts = {}) {
  const context = await browser.newContext({
    viewport: opts.viewport || { width: 1440, height: 900 },
    colorScheme: opts.colorScheme || 'light',
    hasTouch: opts.hasTouch || false,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(500);

  let result;
  if (opts.action) result = await opts.action(page);

  if (!opts.skipScreenshot) {
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: opts.fullPage ?? false });
  }

  console.log(`\n=== ${name} ===`);
  errors.length === 0 ? console.log('No console errors') : errors.forEach((e) => console.log('ERROR:', e));
  if (result !== undefined) console.log('Result:', JSON.stringify(result));

  await context.close();
  return page;
}

// Get an album slug from portfolio page
const albumHref = await (async () => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/portfolio', { waitUntil: 'networkidle' });
  const href = await page.locator('a[href^="/portfolio/"]').first().getAttribute('href');
  await context.close();
  return href;
})();

console.log('\nAlbum slug:', albumHref);
const albumUrl = `http://localhost:3000${albumHref}`;

// Album page - back button positioning, desktop
await checkPage('album-back-desktop', albumUrl, { fullPage: false });

// Album page - back button positioning, mobile
await checkPage('album-back-mobile', albumUrl, { viewport: { width: 375, height: 812 }, fullPage: false });

// Click back button and verify navigation
await checkPage('album-back-click', albumUrl, {
  fullPage: false,
  skipScreenshot: true,
  action: async (page) => {
    await page.getByRole('link', { name: 'Back' }).click();
    await page.waitForLoadState('networkidle');
    return page.url();
  },
});

// Footer - light desktop
await checkPage('footer-light-desktop', 'http://localhost:3000/', {
  fullPage: true,
});

// Footer - light mobile
await checkPage('footer-light-mobile', 'http://localhost:3000/', {
  viewport: { width: 375, height: 812 },
  fullPage: true,
});

// Footer - dark desktop
await checkPage('footer-dark-desktop', 'http://localhost:3000/', {
  colorScheme: 'dark',
  fullPage: true,
});

// Contact page - WhatsApp/Call brand colors
await checkPage('contact-channels', 'http://localhost:3000/contact', { fullPage: true });
await checkPage('contact-channels-dark', 'http://localhost:3000/contact', { colorScheme: 'dark', fullPage: true });

// Home page BookingCTA - WhatsApp/Call brand colors
await checkPage('home-booking-cta', 'http://localhost:3000/', {
  fullPage: false,
  action: async (page) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1200));
    await page.waitForTimeout(300);
  },
});

await browser.close();
