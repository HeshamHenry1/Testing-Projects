describe('Login User with correct email and password', () => {
    it('Login User with correct email and password', async() => {
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
        await emailInput.setValue('test_9@gmail.com');
        await passwordInput.setValue('testtest');
        await loginBtn.click();


    });
    it('delet account that i logined it ', async() => {   

        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).toBeDisplayed();
        const deletAccountBtn = await $('.shop-menu>ul>li>a[href="/delete_account"]');
        await deletAccountBtn.click();
        const accountDeletedWord = await $('.col-sm-9>h2>b');
        await expect(accountDeletedWord).toBeDisplayed();
        const contenueBtn_2 = await $('.btn-primary');
        await contenueBtn_2.click();
        await expect(accountName).not.toBeDisplayed();



    });
});