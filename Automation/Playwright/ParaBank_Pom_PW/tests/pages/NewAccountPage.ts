
import { Page, expect } from '@playwright/test';

export class NewAccountPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
    }

    async openAccount(type: 'Checking' | 'Savings', fromAccountId: string) {
        const typeValue = type === 'Checking' ? '0' : '1';
        await this.page.locator('#type').selectOption(typeValue);
        await this.page.locator('#fromAccountId').selectOption(fromAccountId);
        await this.page.getByRole('button', { name: 'Open New Account' }).click();
    }

    async expectSuccessMessage() {
        await expect(this.page.locator('#rightPanel')).toBeVisible();
        await expect(this.page.getByText('Your new account has been created!')).toBeVisible();
    }

    async goToAccountsOverview() {
        await this.page.getByRole('link', { name: 'Accounts Overview' }).click();
    }
}
