import { expect, Page } from '@playwright/test';
class loginPage{
    private page : Page ;
    constructor(page: Page){
        this.page = page ;
    }
     async verifyLoginPageUrl() {
    await expect(this.page).toHaveURL('https://demo.nopcommerce.com/login?returnUrl=%2F');
  }
   async fillLoginForm(email: string, password: string) {
  const emailInput = this.page.locator('#Email');
  const passwordInput = this.page.locator('#Password');

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill(email);
  await passwordInput.fill(password);
}
  async clickLoginButton() {
    await this.page.locator('button.login-button').click();
  }
   async verifySuccessfulLogin() {
    const logoutButton = this.page.locator('a.ico-logout');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toHaveText('Log out');
  }
  
  async verifyLoginErrorMessage(expectedMessage: string) {
    const errorMessage = this.page.locator('.message-error.validation-summary-errors');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(expectedMessage);
  }
  async clickForgotPassword() {
    await this.page.click('a[href="/passwordrecovery"]');
  }
  async passwordEyeVisibility() {
  const passwordInput = this.page.locator('#Password');
  const passwordEyeIcon = this.page.locator('.password-eye'); 
  await expect(passwordInput).toHaveAttribute('type', 'password');
  await passwordEyeIcon.click();
  await expect(passwordInput).toHaveAttribute('type', 'text');
}
async setRememberMe(value: boolean) {
  const checkbox = this.page.locator('#RememberMe');
  const isChecked = await checkbox.isChecked();
  if (value && !isChecked) {
    await checkbox.check();
  } else if (!value && isChecked) {
    await checkbox.uncheck();
  }
}
async addLogOut() {
  const logoutButton = this.page.locator('a.ico-logout');
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  } else {
    console.warn('Log out button not visible, maybe user is not logged in.');
  }
}
async checkIfLoggedIn(): Promise<boolean> {
  const logoutButton = this.page.locator('a.ico-logout');
  return await logoutButton.isVisible();
}

}
export{loginPage}