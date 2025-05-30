import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.spec'

test.describe('Login', () => {
  test('Valid Login Test', async ({ page }) => {
    const login = new LoginPage(page); 

    await test.step('0 - Go to home page', async () => {
      await login.goToHomePage();
    });

    await test.step('1 - Verify login page', async () => {
      await login.verifyLoginPage(); 
    });
    await test.step('2 - pause to check test ', async () => {
        await login.pausePage(); 
      });

    await test.step('3 - Valid login', async () => {
      await login.login('standard_user', 'secret_sauce');
    });

    await test.step('4 - Verify redirected to product page', async () => {
      await login.verifyGoToProductPage();
    });
  });
});
