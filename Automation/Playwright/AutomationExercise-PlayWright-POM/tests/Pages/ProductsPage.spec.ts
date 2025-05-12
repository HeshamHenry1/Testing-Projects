import { expect, Page } from '@playwright/test';

class Products{
    private page : Page ;
    constructor(page:Page ){
        this.page = page;
    }
    async goToProductPage() {
        const productButton = await this.page.getByText('Products');
        await productButton.click();
    }
    async verifyAllProductVisiable(){
        const allProductWord = await this.page.locator('.features_items>h2');
        await expect(allProductWord).toHaveText('All Products');
    }
    async checkProductListVisiable(){
        const productList = await this.page.locator('.features_items');
        await expect(productList).toBeVisible();
    }
    async addProductToCart(productId: number) {
        const product = await this.page.locator('.single-products').nth(productId);
        await product.hover();
        const addProductButton = await this.page.locator(`a[data-product-id="${productId}"]`).first();
        await addProductButton.click();
    }
    async viewProduct(productId: number){
        const viewProductItem = await this.page.locator(`a[href="/product_details/${productId}"]`);
        await viewProductItem.click();
    }
    async verifyDetailesOfProductIsVisiable(){
        const productCard = await this.page.locator('.product-information');
        const nameOfProduct = await this.page.locator('.product-information>h2');
        const categoryOfProduct = await this.page.locator('.product-information>p').nth(0);
        const avilabilityOfProduct = await this.page.locator('.product-information>p').nth(1);
        const conditionOfProduct = await this.page.locator('.product-information>p').nth(2);
        const brandOfProduct = await this.page.locator('.product-information>p').nth(3);
        const priceOfProduct = await this.page.locator('.product-information>span>span');
        await expect(productCard).toBeVisible();
        await expect(nameOfProduct).toBeVisible();
        await expect(categoryOfProduct).toBeVisible();
        await expect(avilabilityOfProduct).toBeVisible();
        await expect(conditionOfProduct).toBeVisible();
        await expect(brandOfProduct).toBeVisible();
        await expect(priceOfProduct).toBeVisible();
    }
    async productQuantity(quantity : string){
        const quantityOfProduct = await this.page.locator('#quantity');
        await quantityOfProduct.clear();
        await quantityOfProduct.fill(quantity);
    }
    async addToCartButtonInCartPage(){
        const addtoCartButton = await this.page.locator('button[class*="cart"]');
        await addtoCartButton.click();
    }
    async getQuantity(productId : number){
        const quantityInCart = await this.page.locator('.cart_quantity>button').nth(productId-1).innerText();
        console.log(`Quantity of product is : ${quantityInCart}`);
    }
    async continueShopping() {
        const continueShopButton = await this.page.getByText('Continue Shopping');
        await continueShopButton.click();
    }
    async viewCartButton() {
        const viewCartButton = await this.page.getByRole('link', { name: 'View Cart' });
        await viewCartButton.click();
    }
    async getNumberProductInCart() {
        const numberOfProducts = await this.page.$$('#cart_info_table > tbody > tr');
        console.log(`number of products in cart is :  ${numberOfProducts.length}`);
    }
    async getProductPrice(productId: number) {
        const productPriceElement = await this.page.locator(`#product-${productId} > .cart_price`);
        const productPrice = await productPriceElement.innerText();
       console.log(`price of product ${productId} is : ${ productPrice}`);
    }
    async addReview(Name : string , Email : string , Review : string ){
        const nameInput = await this.page.locator('#name');
        const emailInput = await this.page.locator('#email');
        const reviewInput = await this.page.locator('#review');
        await nameInput.fill(Name);
        await emailInput.fill(Email);
        await reviewInput.fill(Review);
        const submitButton = await this.page.locator('#button-review');
        await submitButton.click();
    }
    async checkSuccessMessageVisable(){
        await this.page.waitForSelector('div.alert-success.alert', { state: 'visible' });
    }
    async search(ItemSearch : string){
        const searchProduct = await this.page.locator('#search_product');
        await searchProduct.fill(ItemSearch);
        const submitSearch = await this.page.locator('#submit_search');
        await submitSearch.click();
    }
    async verifyProductRelatedSearch(ItemSearch : string){
        const productElements = await this.page.$$('.productinfo > p');
        for (const element of productElements) {
            const textContent = await element?.textContent();
            if (textContent && (textContent.includes(ItemSearch) || textContent.includes('Sleeves'))) {
                console.log(`Product name: ${textContent} contains 'dress' or 'sleeves'.`);
            } else {
                console.log(`Product name: ${textContent} does not contain 'dress' or 'sleeves'.`);
            }
        }
    }

}
export{Products}