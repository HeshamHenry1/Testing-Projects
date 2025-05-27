import { test } from '@playwright/test';
import { BillPaymentPage, PayeeData } from './pages/BillPaymentPage';

const validPayee: PayeeData = {
  name: 'John Doe',
  street: '123 Main St',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62704',
  phone: '1234567890',
  accountNumber: '15564',
  verifyAccount: '15564',
  amount: '50'
};

test.describe('Bill Payment Services', () => {
  let billPaymentPage: BillPaymentPage;

  test.beforeEach(async ({ page }) => {
    billPaymentPage = new BillPaymentPage(page);
    await test.step('1. Go to Bill Payment page', async () => {
      await billPaymentPage.goto();
    });
    await test.step('2. Login with valid credentials', async () => {
      await billPaymentPage.login('test_1', 'test_1');
    });
    await test.step('3. Navigate to Bill Pay section', async () => {
      await billPaymentPage.navigateToBillPay();
    });
  });

  test('Pay bill with valid information', async () => {
    await test.step('1. Fill in valid payee form', async () => {
      await billPaymentPage.fillPayeeForm(validPayee);
    });
    await test.step('2. Send payment', async () => {
      await billPaymentPage.sendPayment();
    });
    await test.step('3. Verify payment is complete', async () => {
      await billPaymentPage.expectPaymentComplete();
    });
  });

  test('Pay the same bill twice with different amounts', async () => {
    await test.step('1. Fill form with amount 30 and send payment', async () => {
      await billPaymentPage.fillPayeeForm({ ...validPayee, amount: '30' });
      await billPaymentPage.sendPayment();
    });
    await test.step('2. Navigate again to Bill Pay page', async () => {
      await billPaymentPage.navigateToBillPay();
    });
    await test.step('3. Fill form with amount 40 and send payment', async () => {
      await billPaymentPage.fillPayeeForm({ ...validPayee, amount: '40' });
      await billPaymentPage.selectAccount(validPayee.accountNumber!);
      await billPaymentPage.sendPayment();
    });
    await test.step('4. Verify second payment is complete', async () => {
      await billPaymentPage.expectPaymentComplete();
    });
  });

  test('Leave payee name empty', async () => {
    await test.step('1. Fill form with empty name field', async () => {
      await billPaymentPage.fillPayeeForm({ ...validPayee, name: undefined });
    });
    await test.step('2. Try to send payment', async () => {
      await billPaymentPage.sendPayment();
    });
    await test.step('3. Verify error for empty name', async () => {
      await billPaymentPage.expectErrorMessage('Payee name is required.');
    });
  });

  test('Enter invalid phone number format', async () => {
    await test.step('1. Fill form with invalid phone number', async () => {
      await billPaymentPage.fillPayeeForm({ ...validPayee, phone: 'invalid' });
    });
    await test.step('2. Try to send payment', async () => {
      await billPaymentPage.sendPayment();
    });
    await test.step('3. Verify error for phone number', async () => {
      await billPaymentPage.expectErrorMessage('error in phone number format.');
    });
  });

  test('Enter invalid account number', async () => {
    await test.step('1. Fill form with invalid account number', async () => {
      await billPaymentPage.fillPayeeForm({ ...validPayee, accountNumber: '00000', verifyAccount: '00000' });
    });
    await test.step('2. Try to send payment', async () => {
      await billPaymentPage.sendPayment();
    });
    await test.step('3. Wait for account mismatch error', async () => {
      await billPaymentPage.page.waitForSelector('text=The account numbers do not');
    });
  });

  test('Non-numeric characters in amount field', async () => {
    await test.step('1. Fill form with invalid amount', async () => {
      await billPaymentPage.fillPayeeForm({ ...validPayee, amount: '1aa' });
    });
    await test.step('2. Try to send payment', async () => {
      await billPaymentPage.sendPayment();
    });
    await test.step('3. Expect generic error', async () => {
      await billPaymentPage.expectGenericError();
    });
  });
});
