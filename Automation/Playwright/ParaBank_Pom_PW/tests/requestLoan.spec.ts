import { test, expect } from '@playwright/test';
import { RequestLoanPage } from './pages/RequestLoanPage';

test.describe('Request Loan Tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Step 1: Navigate to About page and login, then go to Request Loan page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/about.htm');
      await page.locator('input[name="username"]').fill('test');
      await page.locator('input[name="password"]').fill('test');
      await page.getByRole('button', { name: 'Log In' }).click();
      await page.locator('a[href*="requestloan"]').click();
    });
  });

  test('Enter valid information and request loan', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount', async () => {
      await requestLoanPage.fillLoanAmount('10000');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('1000');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify loan request success message', async () => {
      await requestLoanPage.expectMessage('Loan Request Complete!');
    });
  });

  test('Enter invalid loan amount (negative value)', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill invalid loan amount', async () => {
      await requestLoanPage.fillLoanAmount('-10000');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('1000');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify error message about loan amount', async () => {
      await requestLoanPage.expectMessage('Amount must be greater than 0');
    });
  });

  test('Enter invalid down payment (negative value)', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount', async () => {
      await requestLoanPage.fillLoanAmount('10000');
    });
    await test.step('Step 2: Fill invalid down payment', async () => {
      await requestLoanPage.fillDownPayment('-1000');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify error message about down payment', async () => {
      await requestLoanPage.expectMessage('Down payment must be greater than 0');
    });
  });

  test('Request loan without selecting an account', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount', async () => {
      await requestLoanPage.fillLoanAmount('5000');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('500');
    });
    await test.step('Step 3: Click Apply Now without selecting account', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 4: Verify error message about account selection', async () => {
      await requestLoanPage.expectMessage('Please select an account to apply for the loan');
    });
  });

  test('Request loan with invalid account selected', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount', async () => {
      await requestLoanPage.fillLoanAmount('5000');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('500');
    });
    await test.step('Step 3: Select invalid from account', async () => {
      await requestLoanPage.selectFromAccount('99999');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify invalid account selection message', async () => {
      await requestLoanPage.expectMessage('Invalid account selection');
    });
  });

  test('Request loan with empty fields', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Click Apply Now without filling any fields', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 2: Verify error message about required fields', async () => {
      await requestLoanPage.expectMessage('Please fill in all required fields');
    });
  });

  test('Request loan with invalid characters in amount field', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount with invalid characters', async () => {
      await requestLoanPage.fillLoanAmount('abc123');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('500');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify invalid loan amount message', async () => {
      await requestLoanPage.expectMessage('Please enter a valid loan amount');
    });
  });

  test('Request loan with large loan amount exceeding maximum limit', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill excessively large loan amount', async () => {
      await requestLoanPage.fillLoanAmount('1000000');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('5000');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify error message for exceeding limit', async () => {
      await requestLoanPage.expectMessage('Loan amount exceeds maximum allowable limit');
    });
  });

  test('Request loan and check loan details', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount', async () => {
      await requestLoanPage.fillLoanAmount('5000');
    });
    await test.step('Step 2: Fill down payment', async () => {
      await requestLoanPage.fillDownPayment('500');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify loan request completion message', async () => {
      await requestLoanPage.expectMessage('Loan Request Complete!');
    });
    await test.step('Step 6: Go to Accounts Overview', async () => {
      await requestLoanPage.goToAccountsOverview();
    });
    await test.step('Step 7: Verify loan details contain expected amount', async () => {
      await requestLoanPage.expectLoanDetailsContains('Loan Amount: $5000');
    });
  });

  test('Request loan with mismatched down payment and loan amount', async ({ page }) => {
    const requestLoanPage = new RequestLoanPage(page);

    await test.step('Step 1: Fill loan amount', async () => {
      await requestLoanPage.fillLoanAmount('10000');
    });
    await test.step('Step 2: Fill down payment greater than loan amount', async () => {
      await requestLoanPage.fillDownPayment('15000');
    });
    await test.step('Step 3: Select from account', async () => {
      await requestLoanPage.selectFromAccount('54858');
    });
    await test.step('Step 4: Click Apply Now', async () => {
      await requestLoanPage.clickApplyNow();
    });
    await test.step('Step 5: Verify error about down payment exceeding loan amount', async () => {
      await requestLoanPage.expectMessage('Down payment cannot exceed loan amount');
    });
  });
});
