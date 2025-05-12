import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.spec';
import { logoutPage } from './pages/logoutPage.spec';

test('Verify user is redirected to login page after logout', async ({ page }) => {
  const login = new LoginPage(page);
  const logout = new logoutPage(page);

  await test.step('1 - Go to homepage and log in with valid credentials', async () => {
    await login.goToHomePage();
    await login.pausePage()
    await login.login('standard_user', 'secret_sauce');
    await login.verifyGoToProductPage();
  });

  await test.step('2 - Click logout and verify redirection to login page', async () => {
    await logout.verifyLogoutRedirectsToLogin();
  });
});
