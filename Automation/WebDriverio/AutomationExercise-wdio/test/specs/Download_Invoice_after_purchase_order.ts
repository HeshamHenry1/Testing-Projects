describe('Download Invoice after purchase order', () => {
    it('add first product in cart ', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const firstProduct = await $$('.single-products')[0];
        await firstProduct?.moveTo();
        const firstAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[0]
        await firstAddToCartBtn?.click();
        const model = await $('.modal-content');
        await expect(model).toBeDisplayed();
        const contShopBtn = await $('.modal-footer>button');
        await contShopBtn.click();
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/view_cart');
        const checkOutBtn = await $('a.check_out');
        await checkOutBtn.click();
    });
    it('signin  after check out ', async() => {
        const registerLoginBtn = await $('.modal-body>.text-center>a[href="/login"]');
        await registerLoginBtn.click();
        const inputName = await $('input[name="name"]');
        const inputEmail = await $('[action="/signup"]>input[name="email"]');
        const signupBtn = await $('[action="/signup"]>button.btn-default');
        await inputName.setValue('test');
        await inputEmail.setValue('test_23@gmail.com');
        await signupBtn.click();

    });
    it('Fill Account Informations ', async() => {
        const enterInformationWord = await $('.login-form>h2');
        await expect(enterInformationWord).toBeDisplayed();
        (await $('#id_gender1')).click();
        const inputPassword = await $('#password');
        await inputPassword.setValue('testtest');
        (await $('#days')).selectByVisibleText('29');
        (await $('#months')).selectByVisibleText('September');
        (await $('#years')).selectByVisibleText('2001');
        (await $('#newsletter')).click();
        (await $('#optin')).click();
        const firstNameInput = await $('#first_name');
        const lastNameInput = await $('#last_name');
        const companyInput = await $('#company');
        const address_1 = await $('#address1');
        const address_2 = await $('#address2');
        await firstNameInput.setValue('test1');
        await lastNameInput.setValue('test2');
        await companyInput.setValue('testcomp');
        await address_1.setValue('test-egypt');
        await address_2.setValue('test2-egypt');
        (await $('#country')).selectByVisibleText('Canada');
        const stateInput = await $('#state');
        const cityInput = await $('#city');
        const zipcodeInput = await $('#zipcode');
        const mobile_numbereInput = await $('#mobile_number');
        await stateInput.setValue('teststate');
        await cityInput.setValue('testcity');
        await zipcodeInput.setValue('123456');
        await mobile_numbereInput.setValue('0000001111');
        const creatAcountBtn = await $('.login-form .btn-default');
        await creatAcountBtn.click();
      



    });
    it('place order after register ', async() => {
        const accountCreatedWord = await $('[data-qa="account-created"]');
        await expect(accountCreatedWord).toBeDisplayed();
        const contenueBtn = await $('[data-qa="continue-button"]');
        await contenueBtn.click();
        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).toBeDisplayed();
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        const checkOutBtn = await $('a.check_out');
        await checkOutBtn.click();
        const addressDeliveryInfo = await $('#address_delivery');
        await expect(addressDeliveryInfo).toBeDisplayed();
        const textAria = await $('[name="message"]');
        await textAria.setValue('Place Order');
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
        const invoiceBtn = await $('.btn.check_out');
        await invoiceBtn.click();
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