import { Page, expect } from '@playwright/test';

export type PayeeData = {
  name?: string,
  street?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  phone?: string,
  accountNumber?: string,
  verifyAccount?: string,
  amount?: string
};

export class BillPaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/about.htm');
  }

  async login(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async navigateToBillPay() {
    await this.page.getByRole('link', { name: 'Bill Pay' }).click();
  }

  async fillPayeeForm(data: PayeeData) {
    if (data.name !== undefined)
      await this.page.locator('input[name="payee\\.name"]').fill(data.name);
    if (data.street)
      await this.page.locator('input[name="payee\\.address\\.street"]').fill(data.street);
    if (data.city)
      await this.page.locator('input[name="payee\\.address\\.city"]').fill(data.city);
    if (data.state)
      await this.page.locator('input[name="payee\\.address\\.state"]').fill(data.state);
    if (data.zipCode)
      await this.page.locator('input[name="payee\\.address\\.zipCode"]').fill(data.zipCode);
    if (data.phone)
      await this.page.locator('input[name="payee\\.phoneNumber"]').fill(data.phone);
    if (data.accountNumber)
      await this.page.locator('input[name="payee\\.accountNumber"]').fill(data.accountNumber);
    if (data.verifyAccount)
      await this.page.locator('input[name="verifyAccount"]').fill(data.verifyAccount);
    if (data.amount)
      await this.page.locator('input[name="amount"]').fill(data.amount);
  }

  async sendPayment() {
    await this.page.getByRole('button', { name: 'Send Payment' }).click();
  }

  async expectPaymentComplete() {
    await expect(this.page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectGenericError() {
    await expect(this.page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    await expect(this.page.getByText('An internal error has')).toBeVisible();
  }

  async selectAccount(accountNumber: string) {
    await this.page.getByRole('combobox').selectOption(accountNumber);
  }
}
