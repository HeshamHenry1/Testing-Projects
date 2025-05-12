import { test, expect } from '@playwright/test';

const validPayee = {
  name: 'John Doe',
  street: '123 Main St',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62704',
  phone: '1234567890',
  accountNumber: '15564',
  verifyAccount: '15564',
  amount: '50'
};

async function fillPayeeForm(page, payeeData: Partial<typeof validPayee>) {
  if (payeeData.name !== undefined)
    await page.locator('input[name="payee\\.name"]').fill(payeeData.name);
  if (payeeData.street)
    await page.locator('input[name="payee\\.address\\.street"]').fill(payeeData.street);
  if (payeeData.city)
    await page.locator('input[name="payee\\.address\\.city"]').fill(payeeData.city);
  if (payeeData.state)
    await page.locator('input[name="payee\\.address\\.state"]').fill(payeeData.state);
  if (payeeData.zipCode)
    await page.locator('input[name="payee\\.address\\.zipCode"]').fill(payeeData.zipCode);
  if (payeeData.phone)
    await page.locator('input[name="payee\\.phoneNumber"]').fill(payeeData.phone);
  if (payeeData.accountNumber)
    await page.locator('input[name="payee\\.accountNumber"]').fill(payeeData.accountNumber);
  if (payeeData.verifyAccount)
    await page.locator('input[name="verifyAccount"]').fill(payeeData.verifyAccount);
  if (payeeData.amount)
    await page.locator('input[name="amount"]').fill(payeeData.amount);
}

test.describe('💸 Bill Payment Services', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('ٌ Login and navigate to Bill Pay', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/about.htm');
      await page.locator('input[name="username"]').fill('test_1');
      await page.locator('input[name="password"]').fill('test_1');
      await page.getByRole('button', { name: 'Log In' }).click();
      await page.getByRole('link', { name: 'Bill Pay' }).click();
    });
  });

  test(' Pay bill with valid information', async ({ page }) => {
    await fillPayeeForm(page, validPayee);
    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
  });

  test(' Pay the same bill twice with different amounts', async ({ page }) => {
    await fillPayeeForm(page, { ...validPayee, amount: '30' });
    await page.getByRole('button', { name: 'Send Payment' }).click();

    await page.getByRole('link', { name: 'Bill Pay' }).click();
    await fillPayeeForm(page, { ...validPayee, amount: '40' });
    await page.getByRole('combobox').selectOption(validPayee.accountNumber);
    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
  });

  test(' Leave payee name empty', async ({ page }) => {
    await fillPayeeForm(page, { ...validPayee, name: undefined });
    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.getByText('Payee name is required.')).toBeVisible();
  });

  test(' Enter invalid phone number format', async ({ page }) => {
    await fillPayeeForm(page, { ...validPayee, phone: 'invalid' });
    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.getByText('error in phone number format.')).toBeVisible();
  });

  test(' Enter invalid account number', async ({ page }) => {
    await fillPayeeForm(page, { ...validPayee, accountNumber: '00000', verifyAccount: '00000' });
    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.getByRole('cell', { name: 'The account numbers do not' })).toBeVisible();
  });

  test(' Non-numeric characters in amount field', async ({ page }) => {
    await fillPayeeForm(page, { ...validPayee, amount: '1aa' });
    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    await expect(page.getByText('An internal error has')).toBeVisible();
  });
});
