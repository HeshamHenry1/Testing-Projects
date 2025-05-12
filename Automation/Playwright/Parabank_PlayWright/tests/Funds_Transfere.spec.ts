import { test, expect } from '@playwright/test';

test.describe('Funds Transfer Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/about.htm');
        await page.locator('input[name="username"]').fill('test_1');
        await page.locator('input[name="password"]').fill('test_1');
        await page.getByRole('button', { name: 'Log In' }).click();
    });

    test('Funds are transferred successfully', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('90');
        await page.locator('#toAccountId').selectOption('91488');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await page.getByRole('link', { name: '91377' }).click();
        await expect(page.getByRole('cell', { name: '-24-2024' }).nth(3)).toContainText('02-24-2024');
        await page.locator('a[href*="id=120037"]').click();
        await expect(page.getByRole('cell', { name: '$' })).toContainText('$90.00');
    });

    test('Transfer funds to the same account', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('10');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('An internal error has')).toBeVisible();
    });

    test('Transfer with negative amount', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#toAccountId').selectOption('15564');
        await page.locator('#amount').fill('-10');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.locator('#rightPanel')).toHaveText('An internal error has');
    });

    test('Transfer with zero amount', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#toAccountId').selectOption('15564');
        await page.locator('#amount').fill('0');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.locator('#rightPanel')).toHaveText('An internal error has');
    });

    test('Transfer with decimal amount', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#toAccountId').selectOption('15564');
        await page.locator('#amount').fill('10.0');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    });

    test('Transfer with special characters in amount', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('1aa');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('Please enter a valid amount.')).toBeVisible();
    });

    test('Transfer with exceeding maximum transfer limit', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('1000000');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).not.toBeVisible();
    });

    test('Transfer funds without selecting destination account', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('50');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('Please select an account to transfer to.')).toBeVisible();
    });

    test('Transfer funds to a non-existent account', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('50');
        await page.locator('#toAccountId').selectOption('99999'); // Non-existent account ID
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('The account you selected does not exist.')).toBeVisible();
    });

    test('Transfer funds between different accounts', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('100');
        await page.locator('#toAccountId').selectOption('91489'); // Another valid account ID
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    });

    test('Transfer funds with server delay', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('100');
        await page.locator('#toAccountId').selectOption('91488');
        await page.waitForTimeout(3000); // 3-second delay to simulate server response time
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    });

    test('Retry funds transfer after previous failure', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('-10');
        await page.locator('#toAccountId').selectOption('91488');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.locator('#rightPanel')).toHaveText('An internal error has');

        // Retry with a valid amount
        await page.locator('#amount').fill('50');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    });

    test('Transfer funds during non-working hours', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('50');
        await page.locator('#toAccountId').selectOption('91488');
        await page.locator('#transferTime').fill('2025-05-08 23:59'); // Assume system doesn't process during this time
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('Transfers cannot be processed during non-working hours.')).toBeVisible();
    });

    test('Attempt funds transfer after logging out', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('50');
        await page.locator('#toAccountId').selectOption('91488');
        await page.getByRole('link', { name: 'Log Out' }).click();
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/login.htm');
    });

    test('Transfer funds from an empty account', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('100');
        await page.locator('#fromAccountId').selectOption('99999'); // Account with zero balance
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByText('Insufficient funds to complete the transfer.')).toBeVisible();
    });

    test('Transfer funds with currency exchange', async ({ page }) => {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await page.locator('#amount').fill('100');
        await page.locator('#toAccountId').selectOption('91489'); // Another account with different currency
        await page.locator('#currencyType').selectOption('USD');
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    });
});
