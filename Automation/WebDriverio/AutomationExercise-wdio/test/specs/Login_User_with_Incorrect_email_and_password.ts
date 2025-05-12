describe('Login User with Incorrect email and password', () => {
    it('Login User with Incorrect email and password and vrify warn message is open', async() => {
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
        await emailInput.setValue('test_12@gmail.com');
        await passwordInput.setValue('testtest');
        await loginBtn.click();
        const warnMessage = await $('form[action="/login"]>p');
        await expect(warnMessage).toBeExisting();
        


    });
});