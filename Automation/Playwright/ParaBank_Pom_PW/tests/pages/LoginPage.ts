import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async loginWithRememberMe(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('#rememberMe').check(); // Checkbox for "Remember Me"
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async expectLoginSuccess() {
    await expect(this.page.locator('#rightPanel')).toBeVisible();
  }

  async expectLoginFailure(errorMessage: string) {
    await expect(this.page.locator('body')).toContainText(errorMessage);
  }
}
