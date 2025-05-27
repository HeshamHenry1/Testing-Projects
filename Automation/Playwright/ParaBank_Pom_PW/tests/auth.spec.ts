import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

test.describe('ParaBank Auth Tests', () => {
  test('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await test.step('Step 1: Navigate to Registration Page', async () => {
      await registerPage.goto();
    });
    await test.step('Step 2: Fill and submit registration form', async () => {
      await registerPage.registerUser({
        firstName: 'test',
        lastName: 'test2',
        address: 'test',
        city: 'test',
        state: 'test',
        zipCode: '000',
        phone: '0000000',
        ssn: '000000',
        username: 'testuser',
        password: 'testpass'
      });
      await registerPage.expectSuccessMessage();
    });
  });

  test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Navigate to Login Page', async () => {
      await loginPage.goto();
    });
    await test.step('Step 2: Perform login with valid credentials', async () => {
      await loginPage.login('testuser', 'testpass');
      await loginPage.expectLoginSuccess();
    });
  });

  test('Invalid Username Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Navigate to Login Page', async () => {
      await loginPage.goto();
    });
    await test.step('Step 2: Try logging in with invalid username', async () => {
      await loginPage.login('wrongUser', 'testpass');
      await loginPage.expectLoginFailure('An internal error has occurred');
    });
  });

  test('Invalid Password Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Navigate to Login Page', async () => {
      await loginPage.goto();
    });
    await test.step('Step 2: Try logging in with invalid password', async () => {
      await loginPage.login('testuser', 'wrongPass');
      await loginPage.expectLoginFailure('Error! An internal error has occurred');
    });
  });

  test('Empty Login Fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Navigate to Login Page', async () => {
      await loginPage.goto();
    });
    await test.step('Step 2: Submit empty login form', async () => {
      await loginPage.login('', '');
      await loginPage.expectLoginFailure('Please enter your username and password.');
    });
  });

  test('Login with Remember Me Checked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Navigate to Login Page', async () => {
      await loginPage.goto();
    });
    await test.step('Step 2: Login with Remember Me checked', async () => {
      await loginPage.loginWithRememberMe('testuser', 'testpass');
      await loginPage.expectLoginSuccess();
    });
  });

  test('Redirect unauthenticated user from account page to login', async ({ page }) => {
    await test.step('Step 1: Try accessing account page without login', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
      await expect(page).toHaveURL(/.*login.htm/);
    });
  });

  test('Session timeout after inactivity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Login successfully', async () => {
      await loginPage.goto();
      await loginPage.login('testuser', 'testpass');
      await loginPage.expectLoginSuccess();
    });
    await test.step('Step 2: Simulate session timeout', async () => {
      await page.waitForTimeout(300000);
    });
    await test.step('Step 3: Reload and check for session timeout', async () => {
      await page.reload();
      await expect(page.locator('text=Session timed out')).toBeVisible();
    });
  });
});
