import{test} from '@playwright/test'
import { HomePage } from "./Pages/HomePage.spec";
import { Products } from './Pages/ProductsPage.spec';
test.describe('Product', async() => {
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
    });
    test('Search for specific item in products ', async() => {
        await test.step('2- go to product page  ',async()=>{
            await Home.goToProductPage();
        })
        await test.step('3- Verify user is navigated to ALL PRODUCTS page successfully  ',async()=>{
            await Product.verifyAllProductVisiable();
        })
        await test.step('4- Verify The products list is visible ',async()=>{
            await Product.checkProductListVisiable();
        })
        await test.step('5- search of dress item as example  ',async()=>{
            await Product.search('Dress');
        })
        await test.step('6- Verify all the products related to search are visible  ',async()=>{
            await Product.verifyProductRelatedSearch('Dress');
        })
    });
    test('Add Products in Cart', async() => {
        await test.step('2- go to product page  ',async()=>{
            await Home.goToProductPage();
        });
        await test.step('3- Hover over first product and click Add to cart ',async()=>{
            await Product.addProductToCart(1);
        });
        await test.step('4- Click Continue Shopping button',async()=>{
            await Product.continueShopping();
        });
        await test.step('5- Hover over second product and click Add to cart',async()=>{
            await Product.addProductToCart(2);
        });
        await test.step('6- Click View Cart button',async()=>{
            await Product.viewCartButton();
        });
        await test.step('7- Verify both products are added to Cart',async()=>{
            await Product.getNumberProductInCart();
        });
        await test.step('8- Verify their prices, quantity and total price',async()=>{
            await Product.getProductPrice(1);
            await Product.getProductPrice(2);
        });
    });
    test.only('Verify Product quantity in Cart', async() => {
        await test.step('2- Click View Product for any product on home page ',async()=>{
            await Product.viewProduct(2);
        });
        await test.step('3- Verify product detail is opened ',async()=>{
            await Product.verifyDetailesOfProductIsVisiable();
        });
        await test.step('4- Increase quantity to 4 ',async()=>{
            await Product.productQuantity('4');
        });
        await test.step('5-  Click Add to cart button in cart page  ',async()=>{
            await Product.addToCartButtonInCartPage();
        });
        await test.step('6- Click View Cart button  ',async()=>{
            await Product.viewCartButton();
        });
        await test.step('7- Verify that product is displayed in cart page  ',async()=>{
            await Product.getNumberProductInCart();
        });
        await test.step('8- Verify that product is displayed in cart page with exact quantity  ',async()=>{
            await Product.getQuantity(1);
        });
        
    });
});