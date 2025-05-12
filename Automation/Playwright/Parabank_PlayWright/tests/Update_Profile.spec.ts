import { test, expect } from '@playwright/test';

test.describe('Update Profile Data Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/about.htm');
        await page.locator('input[name="username"]').fill('test_5');
        await page.locator('input[name="password"]').fill('test_5');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.locator('a[href*="updateprofile"]').click();
    });

    test('Update profile with valid information in First Name', async ({ page }) => {
        await page.locator('[id="customer\\.firstName"]').fill('test_4');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByRole('heading', { name: 'Profile Updated' })).toBeVisible();
    });

    test('Update profile with valid information in all fields', async ({ page }) => {
        await page.locator('[id="customer\\.firstName"]').fill('test1');
        await page.locator('[id="customer\\.lastName"]').fill('test2');
        await page.locator('[id="customer\\.address\\.street"]').fill('test123');
        await page.locator('[id="customer\\.address\\.city"]').fill('test city');
        await page.locator('[id="customer\\.address\\.state"]').fill('test ca');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('000');
        await page.locator('[id="customer\\.phoneNumber"]').fill('000-000-0000');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByRole('heading', { name: 'Profile Updated' })).toBeVisible();
    });

   

    test('Update profile with invalid phone number', async ({ page }) => {
        await page.locator('[id="customer\\.phoneNumber"]').fill('invalidPhoneNumber');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('Please enter a valid phone number')).toBeVisible();
    });

    test('Update profile with invalid zip code', async ({ page }) => {
        await page.locator('[id="customer\\.zipCode"]').fill('invalidZip');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('Please enter a valid zip code')).toBeVisible();
    });

    test('Update profile with empty first name', async ({ page }) => {
        await page.locator('[id="customer\\.firstName"]').fill('');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('First Name is required')).toBeVisible();
    });

    test('Update profile with empty last name', async ({ page }) => {
        await page.locator('[id="customer\\.lastName"]').fill('');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('Last Name is required')).toBeVisible();
    });

    test('Update profile with incomplete address', async ({ page }) => {
        await page.locator('[id="customer\\.address\\.street"]').fill('');
        await page.locator('[id="customer\\.address\\.city"]').fill('');
        await page.locator('[id="customer\\.address\\.state"]').fill('');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('Address fields cannot be empty')).toBeVisible();
    });

    test('Update profile with valid first name and special characters in last name', async ({ page }) => {
        await page.locator('[id="customer\\.firstName"]').fill('testFirst');
        await page.locator('[id="customer\\.lastName"]').fill('!@#$%'); // Special characters in last name
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('Last Name contains invalid characters')).toBeVisible();
    });

    test('Update profile with a valid phone number in the wrong format', async ({ page }) => {
        await page.locator('[id="customer\\.phoneNumber"]').fill('12345');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('Please enter a valid phone number format (e.g., 123-456-7890)')).toBeVisible();
    });

    test('Update profile with valid information and check for changes', async ({ page }) => {
        // Update first name
        await page.locator('[id="customer\\.firstName"]').fill('updatedFirstName');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByRole('heading', { name: 'Profile Updated' })).toBeVisible();

        // Verify the update
        const updatedFirstName = await page.locator('[id="customer\\.firstName"]').inputValue();
        expect(updatedFirstName).toBe('updatedFirstName');
    });

    test('Update profile with all fields cleared', async ({ page }) => {
        await page.locator('[id="customer\\.firstName"]').fill('');
        await page.locator('[id="customer\\.lastName"]').fill('');
        await page.locator('[id="customer\\.address\\.street"]').fill('');
        await page.locator('[id="customer\\.address\\.city"]').fill('');
        await page.locator('[id="customer\\.address\\.state"]').fill('');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('');
        await page.locator('[id="customer\\.phoneNumber"]').fill('');
        await page.getByRole('button', { name: 'Update Profile' }).click();
        await expect(page.getByText('All fields are required')).toBeVisible();
    });
});
