import { expect, test } from '@playwright/test';

test('un client se connecte et retrouve ses commandes', async ({ page }) => {
  await page.goto('/mes-commandes');
  await expect(page).toHaveURL(/\/connexion\?retour=%2Fmes-commandes/);
  await page.getByLabel('Identifiant').fill('emilys');
  await page.getByLabel('Mot de passe').fill('emilyspass');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page).toHaveURL('/mes-commandes');
  await expect(page.getByRole('heading', { name: 'Commande n° 1' })).toBeVisible();
});

test('un modérateur est renvoyé au catalogue', async ({ page }) => {
  await page.goto('/admin');
  await page.getByLabel('Identifiant').fill('oliviaw');
  await page.getByLabel('Mot de passe').fill('oliviawpass');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page).toHaveURL('/catalogue');
});

test('une commande incomplète est refusée', async ({ page }) => {
  await page.goto('/catalogue');
  await page.getByRole('button', { name: 'Ajouter au panier' }).first().click();
  await expect(page.getByRole('link', { name: 'Panier (1)' })).toBeVisible();
  await page.goto('/commande');
  await page.getByRole('button', { name: 'Valider la commande' }).click();
  await expect(page.getByText('Le nom est obligatoire.')).toBeVisible();
  await expect(page).toHaveURL('/commande');
});
