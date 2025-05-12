describe('Verify All Products and product detail page', () => {
    it('Check The products list is visible', async() => {
        await browser.url('http://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        const productBtn = await $('.shop-menu>ul>li>a[href="/products"]');
        await productBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/products');
        const productsList = await $('.features_items');
        await expect(productsList).toBeDisplayed();
        const viewProduct_1 = await $('a[href="/product_details/1"]');
        await viewProduct_1.click();
        const productInformation = await $('.product-information');
        await expect(productInformation).toBeDisplayed();
        
        
    });
    
});