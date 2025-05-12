import { test, expect, Page } from '@playwright/test';

class RegisterLogin{
    private page:Page;
    constructor(page:Page){
        this.page = page;
    }

   
    async creatNewAccount(Name : string , Email: string ){
        const signInName = await this.page.locator('form[action="/signup"]>input[name="name"]');
        await signInName.fill(Name);
        const signInEmail = await this.page.locator('form[action="/signup"]>input[name="email"]');
        await signInEmail.fill(Email);
        const signUpButton = await this.page.getByRole('button', { name: 'Signup' });
        await signUpButton.click();
    }

    async fillDataToNewAccount(){
        await this.page.waitForSelector('#password');
        const passwordInput = await this.page.locator('#password');
        await passwordInput.fill('testtest');
        const selectDays = await this.page.locator('#days');
        await selectDays.selectOption('1');
        const selectMonth = await this.page.locator('#months');
        await selectMonth.selectOption('January');
        const selectYear = await this.page.locator('#years');
        await selectYear.selectOption('2021');
        const newSettler = await this.page.locator('#newsletter');
        await newSettler.check();
        const optionRecive = await this.page.locator('#optin');
        await optionRecive.check();
        const firstName = await this.page.locator('#first_name');
        await firstName.fill('test');
        const lastName = await this.page.locator('#last_name');
        await lastName.fill('test2');
        const company = await this.page.locator('#company');
        await company.fill('test company');
        const address_1 = await this.page.locator('#address1');
        await address_1.fill('address1 test');
        const address_2 = await this.page.locator('#address2');
        await address_2.fill('address2 test');
        const country = await this.page.locator('#country');
        await country.selectOption('Canada');
        const state = await this.page.locator('#state');
        await state.fill('state test');
        const city = await this.page.locator('#city');
        await city.fill('city test');
        const zipcode = await this.page.locator('#zipcode');
        await zipcode.fill('000000');
        const mobileNumber = await this.page.locator('#mobile_number');
        await mobileNumber.fill('00001111');
        const createButton = await this.page.locator('//button[text()="Create Account"]');
        await createButton.click();

    }

    async checkNewRegAccount(Name : string){
        await expect(this.page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');
        const continueButton = await this.page.locator('//a[text()="Continue"]');
        await continueButton.click();
        await expect(this.page.locator('//b')).toHaveText(Name);
    }

    async deleteAccount(){
        const deleteButton = await this.page.locator('a[href*="/delete"]');
       await deleteButton.click();
       await expect(this.page.locator('h2[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
       const continueButton = await this.page.locator('//a[text()="Continue"]');
       await continueButton.click();
       await expect(this.page.locator('//b')).not.toBeVisible();
   }
   async login(Email:string , Password : string){
    await expect(this.page.locator('.login-form>h2')).toBeVisible();
    await expect(this.page.locator('.login-form>h2')).toHaveText('Login to your account');
    const emailLogin = await this.page.locator('input[data-qa="login-email"]');
    await emailLogin.fill(Email);
    const passwordLogin = await this.page.locator('input[data-qa="login-password"]');
    await passwordLogin.fill(Password);
    const confirmLoginButton = await this.page.locator('//button[text()="Login"]');
    await confirmLoginButton.click();
}
async checkLogin(Name : string){
    await expect(this.page.locator('//b')).toHaveText(Name);

}
async VerifyErrorMessageLogin(){
    const errorLoginMessage = await this.page.locator('form[action="/login"]>p');
    await expect(errorLoginMessage).toBeVisible();
    await expect(errorLoginMessage).toHaveText('Your email or password is incorrect!');
} 
async verifyErrorMessageRegister(){
    const errorRegisterMessage = await this.page.locator('form[action="/signup"]>p');
    await expect(errorRegisterMessage).toBeVisible();
    await expect(errorRegisterMessage).toHaveText('Email Address already exist!');
}
async verifyLogout(){
    await expect(this.page.url()).toEqual('https://automationexercise.com/login');
}

}

export{RegisterLogin}