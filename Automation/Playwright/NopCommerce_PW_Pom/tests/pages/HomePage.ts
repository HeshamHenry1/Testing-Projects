import { expect, Page } from '@playwright/test';

class Homepage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoHomePage() {
        await this.page.goto('https://demo.nopcommerce.com/');
    }

    async verifyHomePageUrl() {
        await expect(this.page).toHaveURL('https://demo.nopcommerce.com/');
    }

    async pausePage() {
        await this.page.pause();
    }

    async gotoRegisterPage() {
        await this.page.getByRole('link', { name: 'Register' }).click();
    }

    async gotoLoginPage() {
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }
     async verifyUserIsLoggedIn() {
    const logoutButton = this.page.locator('a.ico-logout');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toHaveText('Log out');

    const loginButton = this.page.locator('a.ico-login');
    await expect(loginButton).toHaveCount(0); // لازم يختفي
  }
}

export { Homepage };
