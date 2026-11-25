import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

test('menu mobile : ouverture, piège du focus, Échap', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile uniquement');
  await page.goto('/');
  const burger = page.getByRole('button', { name: 'Ouvrir le menu' });
  await burger.click();
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden();
});

test('sous-menu prestations (desktop)', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop uniquement');
  await page.goto('/');
  await page.getByRole('button', { name: /Prestations/ }).click();
  await page.locator('#sub-services').getByRole('link', { name: /Nettoyage de façade/ }).click();
  await expect(page).toHaveURL(/nettoyage-facade-drone/);
});

test('FAQ : accordéon', async ({ page }) => {
  await page.goto('/');
  const item = page.locator('.faq-item').first();
  await item.locator('summary').click();
  await expect(item).toHaveAttribute('open', '');
});

test('avant / après : clavier', async ({ page }) => {
  await page.goto('/');
  const s = page.getByRole('slider', { name: 'Comparer avant et après' });
  await s.focus();
  await page.keyboard.press('Home');
  await expect(s).toHaveAttribute('aria-valuenow', '0');
  await page.keyboard.press('ArrowRight');
  await expect(s).toHaveAttribute('aria-valuenow', '4');
});

test('pages villes : avant / après simulé, signalé et crédité', async ({ page }) => {
  for (const slug of ['paris', 'arras', 'beauvais']) {
    await page.goto(`/villes/${slug}/`);
    const ba = page.locator('.city-ba');
    await expect(ba.getByRole('slider', { name: 'Comparer avant et après' })).toBeVisible();
    await expect(ba.locator('figcaption')).toContainText('pas un chantier Drone Éclat');
    await expect(ba.locator('figcaption a[rel~="license"]')).toHaveCount(1);
    const srcs = await ba.locator('img').evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).currentSrc));
    expect(srcs.some((s) => s.includes(encodeURIComponent(`/villes/sim/${slug}-avant.webp`)))).toBe(true);
  }
});

test('pages villes : vraies photos d’archives, créditées et signalées', async ({ page }) => {
  for (const slug of ['charleville-mezieres', 'troyes', 'reims']) {
    await page.goto(`/villes/${slug}/`);
    const ba = page.locator('.city-ba');
    await expect(ba.locator('.arch-fig')).toHaveCount(2);
    await expect(ba.locator('.arch-fig a[rel~="license"]')).toHaveCount(2);
    await expect(ba).toContainText('Travaux non réalisés par Drone Éclat');
    await expect(ba.getByRole('slider')).toHaveCount(0);
  }
});

test('accueil : un seul avant / après, sur une maison', async ({ page }) => {
  await page.goto('/');
  const ba = page.locator('.wow-ba');
  await expect(ba.getByRole('slider', { name: 'Comparer avant et après' })).toHaveCount(1);
  await expect(page.getByRole('tablist', { name: 'Choisir une ville' })).toHaveCount(0);
  await expect(ba.locator('figcaption')).toContainText('pas un chantier Drone Éclat');
});

test('vérification de zone : code postal invalide puis valide (API simulée)', async ({ page }) => {
  await page.route('https://geo.api.gouv.fr/**', (r) => r.fulfill({ json: [{ nom: 'Margny-lès-Compiègne', centre: { type: 'Point', coordinates: [2.82, 49.43] } }] }));
  await page.goto('/zones-intervention/');
  const input = page.getByLabel('Votre code postal');
  await input.fill('60');
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText(/code postal à 5 chiffres/)).toBeVisible();
  await input.fill('60280');
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText(/dans notre secteur d’intervention/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Demander une étude pour Margny/ })).toHaveAttribute('href', '/contact/?cp=60280');
});

test('galerie : filtre et visionneuse', async ({ page }) => {
  await page.goto('/realisations/');
  await page.getByRole('button', { name: 'Toiture', exact: true }).click();
  await page.locator('.gal-item button').first().click();
  await expect(page.locator('dialog.lightbox')).toBeVisible();
  await expect(page.getByText(/Ce n’est pas une photo de chantier/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog.lightbox')).toBeHidden();
});

test('estimateur : 3 étapes, validation, photo, envoi réel et confirmation', async ({ page }) => {
  await page.goto('/contact/?service=demoussage-toiture-drone');
  const next = page.getByRole('button', { name: /Continuer/ });
  await next.click();
  await expect(page.getByText('Choisissez un type de bâtiment.')).toBeVisible();
  await page.getByRole('radio', { name: 'Maison individuelle' }).check();
  await expect(page.getByRole('radio', { name: 'Démoussage / traitement de toiture' })).toBeChecked(); // prérempli depuis l'URL
  await page.getByLabel('Code postal').fill('60200');
  await page.getByLabel('Commune').fill('Compiègne');
  await next.click();
  const png = path.join(__dirname, 'fixture.png');
  if (!fs.existsSync(png)) fs.writeFileSync(png, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
  await page.locator('input[type=file]').setInputFiles(png);
  await expect(page.getByRole('img', { name: /Photo 1/ })).toBeVisible();
  await page.getByText(/Préciser la surface/).click();
  await page.getByLabel('Surface approximative (m²)').fill('140');
  await page.getByLabel('Matériau').selectOption('Fibrociment');
  await next.click();
  await page.getByLabel('Nom').fill('Test Automatisé');
  await page.getByLabel('Téléphone').fill('0612');
  await page.getByLabel('E-mail').fill('pas-un-mail');
  await expect(page.getByText(/diagnostic amiante/)).toBeVisible();
  await page.waitForTimeout(4200); // délai anti-robot
  const send = page.getByRole('button', { name: 'Recevoir mon devis gratuit' });
  await send.click();
  await expect(page.getByText(/Numéro français/)).toBeVisible();
  await expect(page.getByText('Adresse e-mail invalide.')).toBeVisible();
  await page.getByLabel('Téléphone').fill('06 12 34 56 78');
  await page.getByLabel('E-mail').fill('test@example.com');
  await page.getByRole('checkbox').check();
  await send.click();
  await expect(page.getByRole('heading', { name: 'Demande bien reçue.' })).toBeVisible();
  await expect(page.getByText(/DE-\d{8}-/)).toBeVisible();
});

test('API devis : rejette un faux fichier image et les champs invalides', async ({ request }) => {
  const r = await request.post('/api/devis', { multipart: { _t: String(Date.now() - 10000), building: 'Maison individuelle', service: 'Nettoyage de façade', postalCode: '60200', city: 'Compiègne', name: 'X Y', phone: '0612345678', email: 'a@b.fr', consent: 'on', photos: { name: 'virus.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('MZ not an image') } } });
  expect(r.status()).toBe(422);
  const r2 = await request.post('/api/devis', { multipart: { _t: String(Date.now() - 10000), building: 'Château', email: 'x' } });
  expect(r2.status()).toBe(422);
});

test('API devis : limitation de débit par IP', async ({ request }, info) => {
  test.skip(info.project.name !== 'desktop', 'une seule exécution');
  const statuses: number[] = [];
  for (let i = 0; i < 8; i++) {
    const r = await request.post('/api/devis', { headers: { 'x-forwarded-for': '203.0.113.7' }, multipart: { _t: String(Date.now() - 10000), building: 'Château' } });
    statuses.push(r.status());
  }
  expect(statuses).toContain(429);
});
