// openNewAccountPage.ts
import { Page } from '@playwright/test';

export class OpenNewAccountPage {
  readonly page: Page;
  readonly accountTypeSelect: string;
  readonly openAccountButton: string;

  constructor(page: Page) {
    this.page = page;
    this.accountTypeSelect = '#type';
    this.openAccountButton = 'button[name="Open New Account"]';
  }

  async openAccount(accountType: string) {
    await this.page.selectOption(this.accountTypeSelect, accountType);
    await this.page.click(this.openAccountButton);
  }

  async isAccountOpened() {
    return await this.page.isVisible('div#rightPanel');
  }
}
