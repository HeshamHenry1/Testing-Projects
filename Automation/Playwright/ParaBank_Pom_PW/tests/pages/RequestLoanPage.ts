import { Page, expect } from '@playwright/test';

export class RequestLoanPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
  }

  async fillLoanAmount(amount: string) {
    await this.page.locator('#amount').fill(amount);
  }

  async fillDownPayment(amount: string) {
    await this.page.locator('#downPayment').fill(amount);
  }

  async selectFromAccount(accountId: string) {
    await this.page.locator('#fromAccountId').selectOption(accountId);
  }

  async clickApplyNow() {
    await this.page.getByRole('button', { name: 'Apply Now' }).click();
  }

  async expectMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async goToAccountsOverview() {
    await this.page.getByRole('link', { name: 'Accounts Overview' }).click();
  }

  async expectLoanDetailsContains(text: string) {
    await expect(this.page.locator('#loanDetails')).toContainText(text);
  }
}
