import { expect, Page } from '@playwright/test';
export class logoutPage {
  constructor(private page: Page) {}

  async verifyLogoutRedirectsToLogin(): Promise<void> {
    
    const menuButton = this.page.locator('#react-burger-menu-btn');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    
    const logoutButton = this.page.locator('#logout_sidebar_link');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    
    await expect(this.page).toHaveURL(/.*saucedemo\.com\/$/);

    const usernameField = this.page.locator('[data-test="username"]');
    const passwordField = this.page.locator('[data-test="password"]');
    const loginButton = this.page.locator('[data-test="login-button"]');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
  }
  async attemptAccessInventoryAfterLogout(): Promise<void> {
    // Try to access the inventory page directly
    await this.page.goto('https://www.saucedemo.com/inventory.html');

    // Verify user is still redirected to login page
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');

    // Optionally check that the login form is still visible
    const loginButton = this.page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();
  }
}

