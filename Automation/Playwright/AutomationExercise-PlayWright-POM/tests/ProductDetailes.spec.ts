import{test} from '@playwright/test'
import { HomePage } from "./Pages/HomePage.spec";
import { Products } from './Pages/ProductsPage.spec';
test.describe('Product Detailes', async() => {
    let Home : HomePage ;
    let Product : Products;

    test.beforeEach(async({page})=>{
        Home = new HomePage(page);
        Product = new Products(page);
        await test.step('0- go to home page ',async()=>{
            await Home.goToHomePage();       
        })
        await test.step('1- verify home page ',async()=>{
            await Home.verifyGoToHomePage();
        })
        await test.step(' pause to check ',async()=>{
            await Home.pausePage();
        })
    })
    test('Verify All Products and product detail page', async() => {
        await test.step('2- go to product page  ',async()=>{
            await Home.goToProductPage();
        })
        await test.step('3- Verify user is navigated to ALL PRODUCTS page successfully  ',async()=>{
            await Product.verifyAllProductVisiable();
        })
        await test.step('4- Verify The products list is visible ',async()=>{
            await Product.checkProductListVisiable();
        })
        await test.step('5- Click on View Product of first product ',async()=>{
            await Product.viewProduct(1);
        })
        await test.step('6- Verify that detail detail is visible ',async()=>{
            await Product.verifyDetailesOfProductIsVisiable();
        })
        
    });
});