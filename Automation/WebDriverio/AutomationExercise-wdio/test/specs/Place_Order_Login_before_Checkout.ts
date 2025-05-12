describe('Place Order: Login before Checkout', () => {
    it('Login User before Checkout', async() => {
        await browser.url('http://automationexercise.com');
        const homePage = await $('body');
        await expect(homePage).toBeDisplayed();
        const login_Signin_Btn = await $('a[href="/login"]');
        await login_Signin_Btn.click();
        const loginWord = await $('.login-form>h2');
        await expect(loginWord).toBeDisplayed();
        const emailInput = await $('form[action="/login"]>input[name="email"]');
        const passwordInput = await $('form[action="/login"]>input[name="password"]');
        const loginBtn = await $('form[action="/login"]>button');
        await emailInput.setValue('test_10@gmail.com');
        await passwordInput.setValue('testtest');
        await loginBtn.click();
        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).toBeDisplayed();


    });
    it('Add Product in cart', async() => {
        // await browser.acceptAlert();
        const firstProduct = await $$('.single-products')[0];
        await firstProduct?.moveTo();
        const firstAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[0]
        await firstAddToCartBtn?.click();
        const contShop = await $('.btn-block');
        await contShop.click();
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/view_cart');
        const checkOutBtn = await $('a.check_out');
        await checkOutBtn.click();
        
    });
    it('check from delivery information', async() => {
        const addressDeliveryInfo = await $('#address_delivery');
        await expect(addressDeliveryInfo).toBeDisplayed();
        const textAria = await $('[name="message"]');
        await textAria.setValue('description');
        const placeOrderBtn = await $('a[href="/payment"]');
        await placeOrderBtn.click();

        
    });
    it('payment information', async() => {
        const nameOnCard = await $('input[name="name_on_card"]');
        await nameOnCard.setValue('test test');
        const cardNumber = await $('input[name="card_number"]');
        await cardNumber.setValue('1234567890000');
        const cvcNumber = await $('input[name="cvc"]');
        await cvcNumber.setValue('123');
        const expirMonth = await $('input[name="expiry_month"]');
        await expirMonth.setValue('123');
        const expirYear = await $('input[name="expiry_year"]');
        await expirYear.setValue('123');
        const payConfirmOrderBtn = await $('#submit');
        await payConfirmOrderBtn.click();
        const successfulWord = await $('.col-sm-offset-1>p');
        await expect(successfulWord).toBeDisplayed();
        const contBtn = await $('[data-qa="continue-button"]');
        await contBtn.click();

    });
    it('delet account ', async() => {
        const deletAccountBtn = await $('.shop-menu>ul>li>a[href="/delete_account"]');
        await deletAccountBtn.click();
        const accountDeletedWord = await $('.col-sm-9>h2>b');
        await expect(accountDeletedWord).toBeDisplayed();
        const contenueBtn_2 = await $('.btn-primary');
        await contenueBtn_2.click();
        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).not.toBeDisplayed();
    });
    
});