import { test, expect } from '@playwright/test';

test.describe('Request Loan Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/about.htm');
        await page.locator('input[name="username"]').fill('test');
        await page.locator('input[name="password"]').fill('test');
        await page.getByRole('button', { name: 'Log In' }).click();
        await page.locator('a[href*="requestloan"]').click();
    });

    test('Enter valid information and request loan', async ({ page }) => {
        await page.locator('#amount').fill('10000');
        await page.locator('#downPayment').fill('1000');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Loan Request Complete!')).toBeVisible();
    });

    // Additional Test Cases

    test('Enter invalid loan amount (negative value)', async ({ page }) => {
        await page.locator('#amount').fill('-10000');
        await page.locator('#downPayment').fill('1000');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Amount must be greater than 0')).toBeVisible();
    });

    test('Enter invalid down payment (negative value)', async ({ page }) => {
        await page.locator('#amount').fill('10000');
        await page.locator('#downPayment').fill('-1000');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Down payment must be greater than 0')).toBeVisible();
    });

    test('Request loan without selecting an account', async ({ page }) => {
        await page.locator('#amount').fill('5000');
        await page.locator('#downPayment').fill('500');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Please select an account to apply for the loan')).toBeVisible();
    });

    test('Request loan with invalid account selected', async ({ page }) => {
        await page.locator('#amount').fill('5000');
        await page.locator('#downPayment').fill('500');
        await page.locator('#fromAccountId').selectOption('99999'); // Invalid account ID
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Invalid account selection')).toBeVisible();
    });

    test('Request loan with empty fields', async ({ page }) => {
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Please fill in all required fields')).toBeVisible();
    });

    test('Request loan with invalid characters in amount field', async ({ page }) => {
        await page.locator('#amount').fill('abc123');
        await page.locator('#downPayment').fill('500');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Please enter a valid loan amount')).toBeVisible();
    });

    test('Request loan with large loan amount exceeding maximum limit', async ({ page }) => {
        await page.locator('#amount').fill('1000000'); // Large amount
        await page.locator('#downPayment').fill('5000');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Loan amount exceeds maximum allowable limit')).toBeVisible();
    });

    test('Request loan and check loan details', async ({ page }) => {
        await page.locator('#amount').fill('5000');
        await page.locator('#downPayment').fill('500');
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Loan Request Complete!')).toBeVisible();
        
        // Verify loan details on account overview page
        await page.getByRole('link', { name: 'Accounts Overview' }).click();
        await expect(page.locator('#loanDetails')).toContainText('Loan Amount: $5000');
    });

    test('Request loan with mismatched down payment and loan amount', async ({ page }) => {
        await page.locator('#amount').fill('10000');
        await page.locator('#downPayment').fill('15000'); // Down payment greater than loan amount
        await page.locator('#fromAccountId').selectOption('54858');
        await page.getByRole('button', { name: 'Apply Now' }).click();
        await expect(page.getByText('Down payment cannot exceed loan amount')).toBeVisible();
    });
});
