// requestLoanTests.ts
import { test, expect } from '@playwright/test';
import { RequestLoanPage } from './pages/RequestLoanPage.spec';

test.describe('Request Loan Tests', () => {
  let requestLoanPage: RequestLoanPage;

  test.beforeEach(async ({ page }) => {
    requestLoanPage = new RequestLoanPage(page);
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await page.fill('input[name="username"]', 'test');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[name="login"]');
    await page.click('a[href*="requestloan"]');
  });

  test('Apply for Loan with Valid Data', async () => {
    await requestLoanPage.applyForLoan('50000', '5000', '54858');
    await expect(requestLoanPage.isLoanApproved()).toBeTruthy();
  });

  test('Apply for Loan with Invalid Data', async () => {
    await requestLoanPage.applyForLoan('invalidAmount', 'invalidDownPayment', '54858');
    await expect(requestLoanPage.isLoanErrorMessageVisible()).toBeTruthy();
  });
});
