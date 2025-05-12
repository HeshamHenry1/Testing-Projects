// openNewAccountTests.ts
import { test, expect } from '@playwright/test';
import { OpenNewAccountPage } from './pages/OpenNewAccountPage.spec';

test.describe('Open New Account Tests', () => {
  let openNewAccountPage: OpenNewAccountPage;

  test.beforeEach(async ({ page }) => {
    openNewAccountPage = new OpenNewAccountPage(page);
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[name="login"]');
    await page.click('a[href*="openAccount"]');
  });

  test('Open Checking Account', async () => {
    await openNewAccountPage.openAccount('0');
    await expect(openNewAccountPage.isAccountOpened()).toBeTruthy();
  });

  test('Open Savings Account', async () => {
    await openNewAccountPage.openAccount('1');
    await expect(openNewAccountPage.isAccountOpened()).toBeTruthy();
  });
});
