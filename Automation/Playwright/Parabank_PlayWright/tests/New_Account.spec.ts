import { test, expect } from '@playwright/test';

test.describe('New Account Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    });

    test('Open a new Checking Account', async ({ page }) => {
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('0');
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.locator('#rightPanel')).toBeVisible();
        await expect(page.getByText('Your new account has been created!')).toBeVisible();
    });

    test.only('Open a new Saving Account', async ({ page }) => {
        await page.locator('input[name="username"]').fill('admin');
        await page.locator('input[name="password"]').fill('admin');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('1');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.locator('#rightPanel')).toBeVisible();
        await expect(page.getByText('Your new account has been created!')).toBeVisible();
    });

    // Additional Test Cases

    test('Open a new Account with insufficient funds', async ({ page }) => {
        await page.locator('input[name="username"]').fill('admin');
        await page.locator('input[name="password"]').fill('admin');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('1'); // Saving Account
        await page.locator('#fromAccountId').selectOption('54858'); // Select account with insufficient funds
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.getByText('Insufficient funds to open the account.')).toBeVisible();
    });

    test('Try to open an account without logging in', async ({ page }) => {
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/login.htm');
        await expect(page.getByRole('heading', { name: 'Welcome to ParaBank' })).toBeVisible();
    });

    test('Check if account balance updates after opening new account', async ({ page }) => {
        await page.locator('input[name="username"]').fill('admin');
        await page.locator('input[name="password"]').fill('admin');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('0'); // Checking Account
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.getByText('Your new account has been created!')).toBeVisible();

        // Go to accounts overview and check if the new account shows up
        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await expect(page.locator('#accountOverview')).toContainText('New Checking Account');
    });

    test('Open a new account with invalid account details', async ({ page }) => {
        await page.locator('input[name="username"]').fill('admin');
        await page.locator('input[name="password"]').fill('admin');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('1'); // Saving Account
        await page.locator('#fromAccountId').selectOption('99999'); // Invalid account ID
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.getByText('Invalid account ID selected.')).toBeVisible();
    });

    test('Open a new account and verify account type', async ({ page }) => {
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('0'); // Checking Account
        await page.getByRole('button', { name: 'Open New Account' }).click();

        // Verify that the correct account type was selected
        await expect(page.locator('#rightPanel')).toBeVisible();
        await expect(page.getByText('Account Type: Checking')).toBeVisible();
    });

    test('Open a new account with no account selected', async ({ page }) => {
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await page.locator('#type').selectOption('1'); // Saving Account
        // Skip selecting fromAccountId
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page.getByText('Please select an account to open a new one.')).toBeVisible();
    });
});
