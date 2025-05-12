import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage.spec'
import { productPage } from './pages/productPage.spec'
import { cartPage } from './pages/cartPage.spec'
import { checkoutPage } from './pages/checkoutPage.spec'

test.describe('Checkout Summary Verification', () => {
  let login: LoginPage;
  let product: productPage;
  let cart: cartPage;
  let checkout: checkoutPage;

  test('Verify order summary after filling user info', async ({ page }) => {
    login = new LoginPage(page);
    product = new productPage(page);
    cart = new cartPage(page);
    checkout = new checkoutPage(page);

    await test.step('1 - Log in with valid credentials', async () => {
      await login.goToHomePage();
      await login.verifyLoginPage();
      await login.login('standard_user', 'secret_sauce');
      await login.pausePage(); 
      await login.verifyGoToProductPage();
    });

    await test.step('2 - Add one product to the cart and verify in cart', async () => {
      await cart.addFirstProductToCartAndVerifyInCart();
    });

    await test.step('3 - Click checkout to go to user info page', async () => {
      await checkout.verifyCheckoutRedirectsToInfoPage();
    });

    await test.step('4 - Fill user information and click Continue', async () => {
      await checkout.fillUserInformation('Hesham', 'Henry', '12345');
    });

    await test.step('5 - Verify order summary and total', async () => {
      await checkout.verifyOrderSummaryDetails();
    });
  });
});
