import { Page, Locator, expect } from '@playwright/test';

export class FundsTransferPage {
    readonly page: Page;
    readonly transferFundsLink: Locator;
    readonly amountInput: Locator;
    readonly toAccountSelect: Locator;
    readonly fromAccountSelect: Locator;
    readonly currencySelect: Locator;
    readonly transferTimeInput: Locator;
    readonly transferButton: Locator;
    readonly logoutLink: Locator;
    readonly rightPanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.toAccountSelect = page.locator('#toAccountId');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.currencySelect = page.locator('#currencyType');
        this.transferTimeInput = page.locator('#transferTime');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.logoutLink = page.getByRole('link', { name: 'Log Out' });
        this.rightPanel = page.locator('#rightPanel');
    }

    async goToTransferFunds() {
        await this.transferFundsLink.click();
    }

    async fillAmount(amount: string) {
        await this.amountInput.fill(amount);
    }

    async selectToAccount(accountId: string) {
        await this.toAccountSelect.selectOption(accountId);
    }

    async selectFromAccount(accountId: string) {
        await this.fromAccountSelect.selectOption(accountId);
    }

    async selectCurrency(currency: string) {
        await this.currencySelect.selectOption(currency);
    }

    async fillTransferTime(datetime: string) {
        await this.transferTimeInput.fill(datetime);
    }

    async clickTransfer() {
        await this.transferButton.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async expectErrorMessageContains(text: string) {
        await expect(this.rightPanel).toContainText(text);
    }

    async expectPageContainsText(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async expectTransferComplete() {
        await expect(this.page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    }

    async expectTransferCompleteNotVisible() {
        await expect(this.page.getByRole('heading', { name: 'Transfer Complete!' })).not.toBeVisible();
    }
}
