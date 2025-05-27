import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { FindTransactionsPage } from './pages/FindTransactionsPage';

test.describe('ParaBank - Find Transactions & Register', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let findTransactionsPage: FindTransactionsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    findTransactionsPage = new FindTransactionsPage(page);

    await test.step('1. Navigate to login page and login', async () => {
      await loginPage.goto();
      await loginPage.login('test', 'test');
    });
  });

  test('User can register successfully', async () => {
    await test.step('1. Navigate to registration page', async () => {
      await registerPage.goto();
    });
    await test.step('2. Fill and submit registration form', async () => {
      await registerPage.registerUser({
        firstName: 'test',
        lastName: 'test2',
        address: 'test',
        city: 'test',
        state: 'test',
        zipCode: '000',
        phone: '0000000',
        ssn: '000000',
        username: 'test',
        password: 'test'
      });
    });
    await test.step('3. Verify successful registration message', async () => {
      await registerPage.expectSuccessMessage();
    });
  });

  test('Find transaction by valid ID', async () => {
    await test.step('1. Navigate to Find Transactions page', async () => {
      await findTransactionsPage.navigate();
    });
    await test.step('2. Select account and search by valid transaction ID', async () => {
      await findTransactionsPage.selectAccount('14565');
      await findTransactionsPage.findByTransactionId('17029');
    });
    await test.step('3. Verify results contain expected transaction', async () => {
      await findTransactionsPage.expectRightPanelContains('Transaction Results Date');
    });
  });

  test('Find transaction by invalid ID', async () => {
    await test.step('1. Navigate and select account', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.selectAccount('14565');
    });
    await test.step('2. Search with invalid transaction ID', async () => {
      await findTransactionsPage.findByTransactionId('0000000');
    });
    await test.step('3. Verify internal error message', async () => {
      await findTransactionsPage.expectInternalErrorMessage();
    });
  });

  test('Find by valid date', async () => {
    await test.step('1. Navigate and search with valid date', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.findByDate('02-26-2024');
    });
    await test.step('2. Verify date appears in results', async () => {
      await findTransactionsPage.expectRightPanelContains('02-26-2024');
    });
  });

  test('Find by invalid date', async () => {
    await test.step('1. Navigate and search with invalid date', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.findByDate('99-99-9999');
    });
    await test.step('2. Verify malformed date result', async () => {
      await findTransactionsPage.expectRightPanelContains('NaN-NaN-NaN');
    });
  });

  test('Find transactions between valid dates', async () => {
    await test.step('1. Navigate and search between two valid dates', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.findBetweenDates('02-25-2024', '02-26-2024');
    });
    await test.step('2. Verify results are displayed', async () => {
      await findTransactionsPage.expectTransactionResults();
    });
  });

  test('Find transactions with invalid date range', async () => {
    await test.step('1. Navigate and search with invalid date range', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.findBetweenDates('32-13-2026', '35-15-2027');
    });
    await test.step('2. Verify invalid date result shown', async () => {
      await findTransactionsPage.expectRightPanelContains('NaN-NaN-NaN');
    });
  });

  test('Find transaction by valid amount', async () => {
    await test.step('1. Navigate and search by valid amount', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.findByAmount('100');
    });
    await test.step('2. Verify amount appears in results', async () => {
      await findTransactionsPage.expectRightPanelContains('$100.00');
    });
  });

  test('Find transaction by invalid amount', async () => {
    await test.step('1. Navigate and search by invalid amount', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.findByAmount('invalid_amount');
    });
    await test.step('2. Verify error message displayed', async () => {
      await findTransactionsPage.expectErrorMessage();
    });
  });

  test('Find transaction with empty fields', async () => {
    await test.step('1. Navigate and click find with empty fields', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.clickFindTransactionsFirstButton();
    });
    await test.step('2. Verify general transaction results shown', async () => {
      await findTransactionsPage.expectRightPanelContains('Transaction Results');
    });
  });

  test('Find transaction using only account selection', async () => {
    await test.step('1. Navigate and select account only', async () => {
      await findTransactionsPage.navigate();
      await findTransactionsPage.selectAccount('14565');
    });
    await test.step('2. Click find transactions button', async () => {
      await findTransactionsPage.clickFindTransactionsFirstButton();
    });
    await test.step('3. Verify results are displayed', async () => {
      await findTransactionsPage.expectTransactionResults();
    });
  });
});
