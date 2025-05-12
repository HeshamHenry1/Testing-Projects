import{test} from '@playwright/test'
import { LoginPage } from'./pages/LoginPage.spec'
import { productPage } from './pages/productPage.spec'
test.describe('check change sort of product to ZA ',async()=>{
    let Login : LoginPage 
    let Product : productPage
    test('check change sort of product to ZA  ', async ({ page }) => {
        const login = new LoginPage(page); 
        const product = new productPage(page)
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
       await test.step('5- change sort product and  check sort of  products to ZA  ',async()=>{
        await product.CheckSortByNameZA()
       })
      

    })
})