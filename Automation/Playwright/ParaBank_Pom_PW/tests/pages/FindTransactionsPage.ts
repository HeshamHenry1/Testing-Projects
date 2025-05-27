import { Page, expect } from '@playwright/test';

export class FindTransactionsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.getByRole('link', { name: 'Find Transactions' }).click();
  }

  async selectAccount(accountId: string) {
    await this.page.locator('#accountId').selectOption(accountId);
  }

  async findByTransactionId(transactionId: string) {
    await this.page.locator('#criteria\\.transactionId').fill(transactionId);
    await this.page.getByRole('button', { name: 'Find Transactions' }).first().click();
  }

  async findByDate(date: string) {
    await this.page.locator('#criteria\\.onDate').fill(date);
    await this.page.getByRole('button', { name: 'Find Transactions' }).nth(1).click();
  }

  async findBetweenDates(fromDate: string, toDate: string) {
    await this.page.locator('#criteria\\.fromDate').fill(fromDate);
    await this.page.locator('#criteria\\.toDate').fill(toDate);
    await this.page.getByRole('button', { name: 'Find Transactions' }).nth(2).click();
  }

  async findByAmount(amount: string) {
    await this.page.locator('#criteria\\.amount').fill(amount);
    await this.page.getByRole('button', { name: 'Find Transactions' }).nth(3).click();
  }

  async clickFindTransactionsFirstButton() {
    await this.page.getByRole('button', { name: 'Find Transactions' }).first().click();
  }

  async expectTransactionResults() {
    await expect(this.page.getByRole('heading', { name: 'Transaction Results' })).toBeVisible();
  }

  async expectErrorMessage() {
    await expect(this.page.getByRole('heading', { name: 'Error!' })).toBeVisible();
  }

  async expectInternalErrorMessage() {
    await expect(this.page.getByText('An internal error has')).toBeVisible();
  }

  async expectRightPanelContains(text: string) {
    await expect(this.page.locator('#rightPanel')).toContainText(text);
  }
}
