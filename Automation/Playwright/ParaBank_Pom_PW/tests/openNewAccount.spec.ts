import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { NewAccountPage } from './pages/NewAccountPage';

test.describe('New Account Tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('1. Navigate to About Page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    });
  });

  test('Open a new Checking Account', async ({ page }) => {
    await test.step('1. Login with valid user', async () => {
      await page.locator('input[name="username"]').fill('test');
      await page.locator('input[name="password"]').fill('test');
      await page.getByRole('button', { name: 'Log In' }).click();
    });

    await test.step('2. Navigate to Open New Account page', async () => {
      await page.getByRole('link', { name: 'Open New Account' }).click();
    });

    await test.step('3. Select Checking account type and submit', async () => {
      await page.locator('#type').selectOption('0');
      await page.getByRole('button', { name: 'Open New Account' }).click();
    });

    await test.step('4. Expect account creation confirmation', async () => {
      await expect(page.locator('#rightPanel')).toBeVisible();
      await expect(page.getByText('Your new account has been created!')).toBeVisible();
    });
  });

  test.only('Open a new Saving Account', async ({ page }) => {
    await test.step('1. Login with admin user', async () => {
      await page.locator('input[name="username"]').fill('admin');
      await page.locator('input[name="password"]').fill('admin');
      await page.getByRole('button', { name: 'Log In' }).click();
    });

    await test.step('2. Navigate to Open New Account page', async () => {
      await page.getByRole('link', { name: 'Open New Account' }).click();
    });

    await test.step('3. Select Savings account type and submit', async () => {
      await page.locator('#type').selectOption('1');
      await page.locator('#fromAccountId').selectOption('54858');
      await page.getByRole('button', { name: 'Open New Account' }).click();
    });

    await test.step('4. Expect account creation confirmation', async () => {
      await expect(page.locator('#rightPanel')).toBeVisible();
      await expect(page.getByText('Your new account has been created!')).toBeVisible();
    });
  });

  test('Open same type of account twice should not duplicate silently', async ({ page }) => {
    const accountPage = new NewAccountPage(page);

    await test.step('1. Open first Checking account', async () => {
      await accountPage.goto();
      await accountPage.openAccount('Checking', '54858');
      await accountPage.expectSuccessMessage();
    });

    await test.step('2. Open second Checking account', async () => {
      await accountPage.goto();
      await accountPage.openAccount('Checking', '54858');
      await accountPage.expectSuccessMessage();
    });

    await test.step('3. Verify at least two checking accounts exist', async () => {
      await accountPage.goToAccountsOverview();
      const checkingAccounts = await page.locator('table tr', { hasText: 'CHECKING' }).count();
      expect(checkingAccounts).toBeGreaterThanOrEqual(2);
    });
  });

  test('Select invalid account type by modifying DOM manually (Security Check)', async ({ page }) => {
    await test.step('1. Go to Open Account page and modify DOM', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
      await page.evaluate(() => {
        const select = document.querySelector('#type');
        const option = new Option('HackedType', '999');
        select?.appendChild(option);
        select?.setAttribute('value', '999');
      });
    });

    await test.step('2. Submit and expect security error', async () => {
      await page.getByRole('button', { name: 'Open New Account' }).click();
      await expect(page.getByText(/Invalid account type/i)).toBeVisible();
    });
  });

  test('Open account after logout and re-login flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new NewAccountPage(page);

    await test.step('1. Login and logout', async () => {
      await loginPage.goto();
      await loginPage.login('test', 'test');
      await page.getByRole('link', { name: 'Log Out' }).click();
    });

    await test.step('2. Re-login and open new account', async () => {
      await loginPage.login('test', 'test');
      await accountPage.goto();
      await accountPage.openAccount('Savings', '54858');
      await accountPage.expectSuccessMessage();
    });
  });

  test('New account should be listed in Accounts Overview', async ({ page }) => {
    const accountPage = new NewAccountPage(page);

    await test.step('1. Open a new Checking account', async () => {
      await accountPage.goto();
      await accountPage.openAccount('Checking', '54858');
      await accountPage.expectSuccessMessage();
    });

    await test.step('2. Navigate to Accounts Overview and verify new account ID', async () => {
      await accountPage.goToAccountsOverview();
      const accountId = await page.locator('a[href*="activity.htm?id="]').first().innerText();
      expect(accountId).toMatch(/^\d+$/);
    });
  });

  test('Verify balance of new account matches source account or starts with 0', async ({ page }) => {
    const accountPage = new NewAccountPage(page);

    await test.step('1. Open a new Savings account', async () => {
      await accountPage.goto();
      await accountPage.openAccount('Savings', '54858');
      await accountPage.expectSuccessMessage();
    });

    await test.step('2. Verify balance of new account', async () => {
      await accountPage.goToAccountsOverview();
      const balanceText = await page.locator('#accountTable td', { hasText: '$' }).first().innerText();
      const balance = parseFloat(balanceText.replace('$', ''));
      expect(balance).toBeGreaterThanOrEqual(0);
    });
  });
});
