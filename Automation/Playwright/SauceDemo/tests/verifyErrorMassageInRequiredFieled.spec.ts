import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.spec';
import { productPage } from './pages/productPage.spec';
import { cartPage } from './pages/cartPage.spec';
import { checkoutPage } from './pages/checkoutPage.spec';

test('Verify that an error is shown when required fields', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new productPage(page);
  const cart = new cartPage(page);
  const checkout = new checkoutPage(page);

  await test.step('1 - Log in with valid credentials', async () => {
    await login.goToHomePage();
    await login.pausePage(); 
    await login.login('standard_user', 'secret_sauce');
    await login.verifyGoToProductPage();

  });

  await test.step('2 - Add a product to the cart', async () => {
    await cart.addFirstProductToCartAndVerifyInCart();
  });

  await test.step('3 - Click Checkout on cart page', async () => {
    await checkout.verifyCheckoutRedirectsToInfoPage();
  });

  await test.step('4 - empty fieled is required to full', async () => {
    await checkout.verifyErrorOnMissingCheckoutInfo()
  })

 
});
