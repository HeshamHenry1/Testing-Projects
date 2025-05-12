// loginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: string;
  readonly passwordInput: string;
  readonly loginButton: string;
  readonly errorMessage: string;
  readonly resetPasswordLink: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[name="login"]';
    this.errorMessage = 'div.error-message';
    this.resetPasswordLink = 'a[href*="forgotpassword"]';
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async isLoggedIn() {
    return await this.page.isVisible('div#rightPanel');
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.errorMessage);
  }

  async forgotPassword() {
    await this.page.click(this.resetPasswordLink);
  }

  async isPasswordResetMessageVisible() {
    return await this.page.isVisible('div.password-reset-message');
  }
}
