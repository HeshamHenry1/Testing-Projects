import { test, expect } from '@playwright/test';

test.describe('Login and Registration Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    });

    test.only('User Registration', async ({ page }) => {
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('[id="customer\\.firstName"]').fill('test');
        await page.locator('[id="customer\\.lastName"]').fill('test2');
        await page.locator('[id="customer\\.address\\.street"]').fill('test');
        await page.locator('[id="customer\\.address\\.city"]').fill('test');
        await page.locator('[id="customer\\.address\\.state"]').fill('test');
        await page.locator('[id="customer\\.address\\.zipCode"]').fill('000');
        await page.locator('[id="customer\\.phoneNumber"]').fill('0000000');
        await page.locator('[id="customer\\.ssn"]').fill('000000');
        await page.locator('[id="customer\\.username"]').fill('test');
        await page.locator('[id="customer\\.password"]').fill('test');
        await page.locator('#repeatedPassword').fill('test');
        await page.getByRole('button', { name: 'Register' }).click();

        // Validate successful registration
        await expect(page.getByText('Your account was created successfully.')).toBeVisible();
    });

    test('Valid Login', async ({ page }) => {
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.locator('#rightPanel')).toBeVisible();
    });

    test('Invalid Username', async ({ page }) => {
        await page.locator('input[name="username"]').fill('invalidUser');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.getByText('An internal error has occurred')).toBeVisible();
    });

    test('Invalid Password', async ({ page }) => {
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('wrongPassword');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.getByText('Error! An internal error has occurred')).toBeVisible();
    });

    test('Password Reset', async ({ page }) => {
        await page.getByRole('link', { name: 'Forgot login info?' }).click();
        await page.locator('#firstName').fill('test');
        await page.locator('#lastName').fill('test2');
        await page.locator('[id="address\\.street"]').fill('test');
        await page.locator('[id="address\\.city"]').fill('test');
        await page.locator('[id="address\\.state"]').fill('test');
        await page.locator('[id="address\\.zipCode"]').fill('000');
        await page.locator('#ssn').fill('000000');
        await page.getByRole('button', { name: 'Find My Login Info' }).click();
        await expect(page.getByText('Username: test Password: test')).toBeVisible();
    });

    // Additional Test Cases:

    test('Attempt to login with empty fields', async ({ page }) => {
        await page.locator('input[name="username"]').fill('');
        await page.locator('input[name="password"]').fill('');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.getByText('Please enter your username and password.')).toBeVisible();
    });

    test('Login with remembered credentials', async ({ page }) => {
        // Simulate previously stored credentials
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.locator('#rememberMe').check();  // If there's a "Remember Me" option
        await page.getByRole('button', { name: 'Log In' }).click();

        // Validate user is redirected to the home page
        await expect(page.locator('#rightPanel')).toBeVisible();
    });

    test('Check session timeout after inactivity', async ({ page }) => {
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.locator('#rightPanel')).toBeVisible();

        // Simulate inactivity for session timeout
        await page.waitForTimeout(300000);  // Wait for 5 minutes
        await page.reload();

        // Validate the session has expired
        await expect(page.getByText('Session timed out')).toBeVisible();
    });

    test('Attempt to access account without logging in', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
        // Validate that user is redirected to login page
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/login.htm');
    });

    test('Invalid Email Format in Registration', async ({ page }) => {
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('[id="customer\\.username"]').fill('test@domain');
        await page.locator('[id="customer\\.password"]').fill('test');
        await page.locator('#repeatedPassword').fill('test');
        await page.locator('[id="customer\\.phoneNumber"]').fill('0000000');
        await page.locator('[id="customer\\.ssn"]').fill('000000');
        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
    });

    test('Invalid Password Format in Registration', async ({ page }) => {
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('[id="customer\\.password"]').fill('123');  // Short password
        await page.locator('#repeatedPassword').fill('123');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByText('Password must be at least 6 characters.')).toBeVisible();
    });
});
