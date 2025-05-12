import{test} from '@playwright/test'
import { HomePage } from "./Pages/HomePage.spec";
import { Products } from './Pages/ProductsPage.spec';
import { Order } from './Pages/OrderPage.spec';
import{RegisterLogin} from './Pages/RegLogPage.spec';
test.describe('Product', async() => {
    let Home : HomePage ;
    let Product : Products;
    let order : Order;
    let register : RegisterLogin;

    test.beforeEach(async({page})=>{
        Home = new HomePage(page);
        Product = new Products(page);
        order = new Order(page);
        register = new RegisterLogin(page);
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
    test('Place Order: Register while Checkout', async() => {
        await test.step('2- Add products to cart ',async()=>{
            await Product.addProductToCart(1);
            await Product.continueShopping();
        })
        await test.step('3- Click Cart button ',async()=>{
            await Home.goToCartPage();
        })
        await test.step('4- Click Proceed To Checkout ',async()=>{
            await order.proceedToCheck();
        })
        await test.step('4- Click Register / Login button',async()=>{
            await order.goToRegLogPageFromCartPage();
        })
        await test.step('5-  create account',async()=>{
            await register.creatNewAccount('test11_1','testpom_1@test.test');
        })
        await test.step('6- Fill all details in Signup',async()=>{
            await register.fillDataToNewAccount();
        })
        await test.step('7- Click Cart button ',async()=>{
            await Home.goToCartPage();
        })
        await test.step('8- Click Proceed To Checkout ',async()=>{
            await order.proceedToCheck();
        })
        await test.step('9- Verify Address Details and Review Your Order ',async()=>{
            await order.verifyAddressDetailes();
        })
        await test.step('10- Enter description in comment text area ',async()=>{
            await order.commentTextArea('description');
        })
        await test.step('11-  click Place Order ',async()=>{
            await order.placeOrder();
        })
        await test.step('12-Enter payment details: Name on Card, Card Number, CVC, Expiration date ',async()=>{
            await order.enterPaymentDetailes('test','000');
        })
        await test.step('13- Verify success message',async()=>{
            await order.verifySuccessMessage();
        })
        
        
    });
});