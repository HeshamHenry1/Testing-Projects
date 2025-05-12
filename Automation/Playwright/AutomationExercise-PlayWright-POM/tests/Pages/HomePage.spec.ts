import { expect, Page } from '@playwright/test';

class HomePage{
    private page :Page;
    constructor(page:Page){
        this.page = page;
    }
    async goToHomePage(){
        await this.page.goto('https://automationexercise.com/');
    }
    async verifyGoToHomePage(){
        await expect(this.page.url()).toEqual('https://automationexercise.com/');
    }
    async pausePage(){
        await this.page.pause();
    }
    async goToRegLogPage(){
        const login_signinButton = await this.page.locator('a[href="/login"]');
        await login_signinButton.click();
    }
    async goToProductPage() {
        const productButton = await this.page.getByText('Products');
        await productButton.click();
    }
    async goToCartPage(){
        const cartButton = await this.page.locator('a[href="/view_cart"]').nth(0);
        await cartButton.click();
    }
    async goToContactUsPage(){
        const contactUsButton = await this.page.getByRole('link', { name: ' Contact us' });
           await contactUsButton.click();
     }
    async logout(){
        const logoutButton = await this.page.locator('a[href="/logout"]');
        await logoutButton.click();
     }
       async cgeckGoToLoginPage(){
        await expect(this.page.url()).toEqual('https://automationexercise.com/login');
    
       }
}
export{HomePage}