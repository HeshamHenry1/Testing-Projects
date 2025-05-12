import { expect, Page } from '@playwright/test';

class Order{
    private page : Page;
    constructor(page:Page){
        this.page = page;
    }
    async proceedToCheck(){
        const proceesButton = await this.page.locator('a[class*="check_out"]');
        await proceesButton.click();
    }
    async goToRegLogPageFromCartPage(){
        const login_signinButton = await this.page.locator('a[href="/login"]').nth(1);
        await login_signinButton.click();
    }
    async verifyAddressDetailes(){
        const addressDetailes = await this.page.locator('#address_delivery');
        await expect(addressDetailes).toBeVisible();
    }
    async reviewOrder(ProductId : number){
        const nameOfProduct = await this.page.locator(`#product-${ProductId} h4`).innerText();
        const brandOfProduct = await this.page.locator(`#product-${ProductId} p`).nth(0).innerText();
        const priceOfProduct = await this.page.locator(`#product-${ProductId} p`).nth(1).innerText();
        console.log(`The Name Of Product : ${nameOfProduct}`);
        console.log(`The Brand of Product  : ${brandOfProduct}`);
        console.log(`The Price Of Product : ${priceOfProduct}`);
    }
    async commentTextArea(message : string){
        const messageTextArea= await this.page.locator('textarea[name="message"]');
        await messageTextArea.fill(message);
    }
    async placeOrder(){
        const placeOrder = await this.page.locator('a[href="/payment"]');
        await placeOrder.click();
    }
    async enterPaymentDetailes(name : string , cardOnNumber : string , ){
        const nameOnCard = await this.page.locator('input[name="name_on_card"]');
        const cardNumber = await this.page.locator('input[data-qa="card-number"]');
        const cvc = await this.page.locator('input[name="cvc"]');
        const expiryMonth = await this.page.locator('input[name="expiry_month"]');
        const expiryYear = await this.page.locator('input[data-qa="expiry-year"]');
        const confirmButton = await this.page.locator('#submit');
        await nameOnCard.fill(name);
        await cardNumber.fill(cardOnNumber);
        await cvc.fill('000');
        await expiryMonth.fill('000');
        await expiryYear.fill('000');
        await confirmButton.click();
    }
    async verifySuccessMessage(){
        const successMessage = await this.page.getByText('Congratulations! Your order');
        await expect(successMessage).toBeVisible();
    }
}
export{Order}