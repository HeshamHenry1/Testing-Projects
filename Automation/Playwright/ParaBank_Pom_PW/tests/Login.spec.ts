// loginTests.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.spec';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
  });

  test('Valid Login', async () => {
    await loginPage.login('test', 'test');
    await expect(loginPage.isLoggedIn()).toBeTruthy();
  });

  test('Invalid Username', async () => {
    await loginPage.login('invalidUser', 'test');
    await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
  });

  test('Invalid Password', async () => {
    await loginPage.login('test', 'invalidPassword');
    await expect(loginPage.isErrorMessageVisible()).toBeTruthy();
  });

  test('Forgot Password', async () => {
    await loginPage.forgotPassword();
    await expect(loginPage.isPasswordResetMessageVisible()).toBeTruthy();
  });
});
