describe('Register_User_with_existing_email', () => {
    it('Signup with exist email and verify warn message  ', async() => {
        await browser.url('http://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        const login_Signin_Btn = await $('a[href="/login"]');
        await login_Signin_Btn.click();
        const newSignupWord = await $('.signup-form>h2');
        await expect(newSignupWord).toBeDisplayed();
        const inputName = await $('input[name="name"]');
        const inputEmail = await $('[action="/signup"]>input[name="email"]');
        const signupBtn = await $('[action="/signup"]>button.btn-default');
        await inputName.setValue('test');
        await inputEmail.setValue('test_11@gmail.com');
        await signupBtn.click();
        const warnMessage = await $('form[action="/signup"]>p');
        await expect(warnMessage).toHaveText('Email Address already exist!');

        

        
    });
});