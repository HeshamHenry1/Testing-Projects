import{test} from '@playwright/test'
import { LoginPage } from'./pages/LoginPage.spec'
import { productPage } from './pages/productPage.spec'
import { cartPage } from './pages/cartPage.spec'
test.describe('Verify that clicking the "Continue Shopping" button navigates back to the Product Page',async()=>{
    let Login : LoginPage 
    let Product : productPage
    let Cart : cartPage
    test('Verify that clicking the "Continue Shopping" button navigates back to the Product Page  ', async ({ page }) => {
        const login = new LoginPage(page); 
        const product = new productPage(page)
        const cart = new cartPage(page)
        await test.step('0 - Go to home page', async () => {
            await login.goToHomePage();
          });
      
          await test.step('1 - Verify login page', async () => {
            await login.verifyLoginPage(); 
          });
          await test.step('2 - pause to check test ', async () => {
              await login.pausePage(); 
            });
      
          await test.step('3 - Valid login', async () => {
            await login.login('standard_user', 'secret_sauce');
          });
      
          await test.step('4 - Verify redirected to product page', async () => {
            await login.verifyGoToProductPage();
          });
          await test.step('4 -check all product have add cart button', async () => {
            await cart.verifyAddToCartButtonInAllProducts();
       
    })
    await test.step('5 -Verify that clicking the "Continue Shopping" button navigates back to the Product Page ', async () => {
        await cart.verifyContinueShoppingRedirectsToProductPage()
   
})

})
})