// requestLoanPage.ts
import { Page } from '@playwright/test';

export class RequestLoanPage {
  readonly page: Page;
  readonly loanAmountInput: string;
  readonly downPaymentInput: string;
  readonly accountIdSelect: string;
  readonly applyButton: string;

  constructor(page: Page) {
    this.page = page;
    this.loanAmountInput = '#amount';
    this.downPaymentInput = '#downPayment';
    this.accountIdSelect = '#accountId';
    this.applyButton = 'button[name="Apply"]';
  }

  async applyForLoan(amount: string, downPayment: string, accountId: string) {
    await this.page.fill(this.loanAmountInput, amount);
    await this.page.fill(this.downPaymentInput, downPayment);
    await this.page.selectOption(this.accountIdSelect, accountId);
    await this.page.click(this.applyButton);
  }

  async isLoanApproved() {
    return await this.page.isVisible('div.loan-approval-message');
  }

  async isLoanErrorMessageVisible() {
    return await this.page.isVisible('div.loan-error-message');
  }
}
