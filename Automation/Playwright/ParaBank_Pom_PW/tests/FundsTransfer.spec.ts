import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { FundsTransferPage } from './pages/FundsTransferPage';

test.describe('Funds Transfer Tests', () => {
  let loginPage: LoginPage;
  let fundsTransferPage: FundsTransferPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    fundsTransferPage = new FundsTransferPage(page);

    await test.step('1. Navigate to login page and login', async () => {
      await loginPage.goto();
      await loginPage.login('test_1', 'test_1');
    });
  });

  test('Funds are transferred successfully', async ({ page }) => {
    await test.step('1. Go to Transfer Funds page', async () => {
      await fundsTransferPage.goToTransferFunds();
    });
    await test.step('2. Enter amount and select destination account', async () => {
      await fundsTransferPage.fillAmount('90');
      await fundsTransferPage.selectToAccount('91488');
    });
    await test.step('3. Click transfer button', async () => {
      await fundsTransferPage.clickTransfer();
    });
    await test.step('4. Verify transfer completion', async () => {
      await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    });
  });

  test('Transfer funds to the same account', async () => {
    await test.step('1. Go to Transfer Funds page', async () => {
      await fundsTransferPage.goToTransferFunds();
    });
    await test.step('2. Enter amount without changing destination account', async () => {
      await fundsTransferPage.fillAmount('10');
    });
    await test.step('3. Attempt transfer to same account and expect error', async () => {
      await fundsTransferPage.clickTransfer();
      await fundsTransferPage.expectPageContainsText('An internal error has');
    });
  });

  test('Transfer with negative amount', async () => {
    await test.step('1. Go to Transfer Funds page', async () => {
      await fundsTransferPage.goToTransferFunds();
    });
    await test.step('2. Select destination account and enter negative amount', async () => {
      await fundsTransferPage.selectToAccount('15564');
      await fundsTransferPage.fillAmount('-10');
    });
    await test.step('3. Click transfer and expect error', async () => {
      await fundsTransferPage.clickTransfer();
      await fundsTransferPage.expectErrorMessageContains('An internal error has');
    });
  });

  test('Transfer with zero amount', async () => {
    await test.step('1. Go to Transfer Funds page', async () => {
      await fundsTransferPage.goToTransferFunds();
    });
    await test.step('2. Select destination account and enter zero amount', async () => {
      await fundsTransferPage.selectToAccount('15564');
      await fundsTransferPage.fillAmount('0');
    });
    await test.step('3. Click transfer and expect error', async () => {
      await fundsTransferPage.clickTransfer();
      await fundsTransferPage.expectErrorMessageContains('An internal error has');
    });
  });

  test('Transfer with decimal amount', async () => {
    await test.step('1. Go to Transfer Funds page', async () => {
      await fundsTransferPage.goToTransferFunds();
    });
    await test.step('2. Select destination account and enter decimal amount', async () => {
      await fundsTransferPage.selectToAccount('15564');
      await fundsTransferPage.fillAmount('10.0');
    });
    await test.step('3. Click transfer and verify completion', async () => {
      await fundsTransferPage.clickTransfer();
      await fundsTransferPage.expectTransferComplete();
    });
  });
});
