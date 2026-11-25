import { test, expect } from '@playwright/test';

const pages = ['/', '/services/demoussage-toiture-drone/', '/services/nettoyage-facade-drone/', '/services/nettoyage-bardage-drone/', '/professionnels/entretien-batiments/', '/technologie/', '/realisations/', '/zones-intervention/', '/a-propos/', '/contact/', '/equipe/', '/fournisseurs/', '/villes/compiegne/', '/villes/paris/', '/journal/', '/securite-reglementation/', '/mentions-legales/', '/confidentialite/', '/cookies/'];

test.describe('Pages', () => {
  for (const p of pages) {
    test(`${p} : 200, un seul H1, title, meta, canonical, pas de débordement, pas d'erreur JS`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(p);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      expect((await page.title()).length).toBeGreaterThan(10);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const imgsWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imgsWithoutAlt).toBe(0);
      expect(errors).toEqual([]);
    });
  }
});

test('404 personnalisée', async ({ page }) => {
  const res = await page.goto('/page-inexistante/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toBeVisible();
});

test('liens internes valides', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const p of ['/', '/contact/', '/journal/']) {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!.split('#')[0]));
    hrefs.forEach((h) => h && seen.add(h.split('?')[0]));
  }
  for (const h of seen) {
    const r = await request.get(h);
    expect(r.status(), h).toBe(200);
  }
});

test('SEO technique : robots, sitemap, llms.txt, données structurées', async ({ page, request }) => {
  expect((await request.get('/robots.txt')).status()).toBe(200);
  const sm = await request.get('/sitemap.xml');
  expect(sm.status()).toBe(200);
  expect(await sm.text()).toContain('/services/demoussage-toiture-drone/');
  expect((await request.get('/llms.txt')).status()).toBe(200);
  await page.goto('/services/demoussage-toiture-drone/');
  const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent || '{}')));
  const types = ld.flat().map((x: { '@type'?: string }) => x['@type']);
  expect(types).toEqual(expect.arrayContaining(['Organization', 'Service', 'BreadcrumbList', 'FAQPage']));
  expect(JSON.stringify(ld)).not.toContain('aggregateRating');
});
