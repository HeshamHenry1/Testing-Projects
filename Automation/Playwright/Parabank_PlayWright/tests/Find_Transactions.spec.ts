import { test, expect } from '@playwright/test';

test.describe('ParaBank - Find Transactions & Register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await page.locator('input[name="username"]').fill('test');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Log In' }).click();
  });

  test('User can register successfully', async ({ page }) => {
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('#customer\\.firstName').fill('test');
    await page.locator('#customer\\.lastName').fill('test2');
    await page.locator('#customer\\.address\\.street').fill('test');
    await page.locator('#customer\\.address\\.city').fill('test');
    await page.locator('#customer\\.address\\.state').fill('test');
    await page.locator('#customer\\.address\\.zipCode').fill('000');
    await page.locator('#customer\\.phoneNumber').fill('0000000');
    await page.locator('#customer\\.ssn').fill('000000');
    await page.locator('#customer\\.username').fill('test');
    await page.locator('#customer\\.password').fill('test');
    await page.locator('#repeatedPassword').fill('test');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#rightPanel')).toContainText('Welcome');
  });

  test('Find transaction by valid ID', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#accountId').selectOption('14565');
    await page.locator('#criteria\\.transactionId').fill('17029');
    await page.getByRole('button', { name: 'Find Transactions' }).first().click();
    await expect(page.getByText('Transaction Results Date')).toBeVisible();
  });

  test('Find transaction by invalid ID', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#accountId').selectOption('14565');
    await page.locator('#criteria\\.transactionId').fill('0000000');
    await page.getByRole('button', { name: 'Find Transactions' }).first().click();
    await expect(page.getByText('An internal error has')).toBeVisible();
  });

  test('Find by valid date', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#criteria\\.onDate').fill('02-26-2024');
    await page.getByRole('button', { name: 'Find Transactions' }).nth(1).click();
    await expect(page.locator('#rightPanel')).toContainText('02-26-2024');
  });

  test('Find by invalid date', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#criteria\\.onDate').fill('99-99-9999');
    await page.getByRole('button', { name: 'Find Transactions' }).nth(1).click();
    await expect(page.locator('#rightPanel')).toContainText('NaN-NaN-NaN');
  });

  test('Find transactions between valid dates', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#criteria\\.fromDate').fill('02-25-2024');
    await page.locator('#criteria\\.toDate').fill('02-26-2024');
    await page.getByRole('button', { name: 'Find Transactions' }).nth(2).click();
    await expect(page.getByRole('heading', { name: 'Transaction Results' })).toBeVisible();
  });

  test('Find transactions with invalid date range', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#criteria\\.fromDate').fill('32-13-2026');
    await page.locator('#criteria\\.toDate').fill('35-15-2027');
    await page.getByRole('button', { name: 'Find Transactions' }).nth(2).click();
    await expect(page.locator('#rightPanel')).toContainText('NaN-NaN-NaN');
  });

  test('Find transaction by valid amount', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#criteria\\.amount').fill('100');
    await page.getByRole('button', { name: 'Find Transactions' }).nth(3).click();
    await expect(page.locator('#rightPanel')).toContainText('$100.00');
  });

  test('Find transaction by invalid amount', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#criteria\\.amount').fill('invalid_amount');
    await page.getByRole('button', { name: 'Find Transactions' }).nth(3).click();
    await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
  });

 
  test('Find transaction with empty fields', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.getByRole('button', { name: 'Find Transactions' }).first().click();
    await expect(page.locator('#rightPanel')).toContainText('Transaction Results');
  });

  test('Find transaction using only account selection', async ({ page }) => {
    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#accountId').selectOption('14565');
    await page.getByRole('button', { name: 'Find Transactions' }).first().click();
    await expect(page.getByRole('heading', { name: 'Transaction Results' })).toBeVisible();
  });
});
