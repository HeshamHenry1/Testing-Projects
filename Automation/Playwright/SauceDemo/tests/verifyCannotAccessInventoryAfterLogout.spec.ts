import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.spec';
import { logoutPage } from './pages/logoutPage.spec';

test('Verify user cannot access inventory page after logout', async ({ page }) => {
  const login = new LoginPage(page);
  const logout = new logoutPage(page);

  await test.step('1 - Log in with valid credentials', async () => {
    await login.goToHomePage();
    await login.login('standard_user', 'secret_sauce');
    await login.verifyGoToProductPage();
  });

  await test.step('2 - Perform logout', async () => {
    await logout.verifyLogoutRedirectsToLogin();
  });

  await test.step('3 - Try to access inventory page directly after logout', async () => {
    await logout.attemptAccessInventoryAfterLogout();
  });
});
