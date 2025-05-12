describe('Verify address details in checkout page', () => {
    it('Signup New email ', async() => {
        await browser.url('https://automationexercise.com/');
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const login_Signin_Btn = await $('a[href="/login"]');
        await login_Signin_Btn.click();
        const newSignupWord = await $('.signup-form>h2');
        await expect(newSignupWord).toBeDisplayed();
        const inputName = await $('input[name="name"]');
        const inputEmail = await $('[action="/signup"]>input[name="email"]');
        const signupBtn = await $('[action="/signup"]>button.btn-default');
        await inputName.setValue('test');
        await inputEmail.setValue('test_20@gmail.com');
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
    it('check account is signed', async() => {
        if ( await browser.isAlertOpen()) {
            await browser.acceptAlert();
            
        };
        
        const accountCreatedWord = await $('[data-qa="account-created"]');
        await expect(accountCreatedWord).toBeDisplayed();
        const contenueBtn = await $('[data-qa="continue-button"]');
        await contenueBtn.click();
        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).toBeDisplayed();
    });
    it('Add Product in cart', async() => {
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
    it('verify address info same of address billing ', async() => {
        const addressInfo = await $$('#address_delivery>li');
        const billingInfo = await $$('#address_invoice>li');
        for(let i = 1; i<addressInfo.length; i++){
            if(addressInfo[i].getAttribute('textContent')===billingInfo[i].getAttribute('textContent')){
                console.log('Information is Valid ');
            }
        }
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