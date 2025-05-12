// updateProfileTests.ts
import { test, expect } from '@playwright/test';
import { UpdateProfilePage } from './pages/UpdateProfilePage.spec';

test.describe('Update Profile Tests', () => {
  let updateProfilePage: UpdateProfilePage;

  test.beforeEach(async ({ page }) => {
    updateProfilePage = new UpdateProfilePage(page);
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await page.fill('input[name="username"]', 'test_5');
    await page.fill('input[name="password"]', 'test_5');
    await page.click('button[name="login"]');
    await page.click('a[href*="updateprofile"]');
  });

  test('Update Profile with Valid Information', async () => {
    await updateProfilePage.updateProfile('John', 'Doe', '123 Street', 'City', 'State', '12345', '555-1234');
    await expect(updateProfilePage.isProfileUpdated()).toBeTruthy();
  });

  test('Update Profile with Missing Information', async () => {
    await updateProfilePage.updateProfile('', '', '', '', '', '', '');
    await expect(updateProfilePage.isProfileUpdated()).toBeFalsy();
  });
});
