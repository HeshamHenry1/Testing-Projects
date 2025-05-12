describe('Logout_User', () => {
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
        await emailInput.setValue('test_10@gmail.com');
        await passwordInput.setValue('testtest');
        await loginBtn.click();


    });
    it('Logout User ', async() => {
        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).toBeDisplayed();
        const logoutBtn = await $('.shop-menu>ul>li>a[href="/logout"]');
        await logoutBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/login');

        
    });

});