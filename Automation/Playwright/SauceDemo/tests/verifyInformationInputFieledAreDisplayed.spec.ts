import{test} from '@playwright/test'
import { LoginPage } from'./pages/LoginPage.spec'
import { productPage } from './pages/productPage.spec'
import { cartPage } from './pages/cartPage.spec'
import { checkoutPage } from './pages/checkoutPage.spec'
test.describe('Verify information input fields are displayed on the Checkout information page',async()=>{
    let Login : LoginPage 
    let Product : productPage
    let Cart : cartPage
    let checkout : checkoutPage
    test('Verify information input fields are displayed on the Checkout information page  ', async ({ page }) => {
        const login = new LoginPage(page); 
        const product = new productPage(page)
        const cart = new cartPage(page)
        const checkout = new checkoutPage(page)
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
          
    
await test.step('5 -Verify that clicking the Checkout button on the Cart Page redirects to the Information Page', async () => {
    await checkout.verifyCheckoutRedirectsToInfoPage()

})
      await test.step('6 -Verify information input fields are displayed on the Checkout information page', async () => {
            await checkout.verifyUserInfoFieldsOnCheckout()
       
    })
})

})