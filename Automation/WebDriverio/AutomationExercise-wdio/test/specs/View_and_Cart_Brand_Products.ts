describe('View & Cart Brand Products', () => {
    it('check select item from brands item is koki kids ', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const productBtn = await $('.shop-menu>ul>li>a[href="/products"]');
        await productBtn.click();
        const brands = await $('.brands_products');
        await expect(brands).toBeDisplayed();
        const kokyKidsItem = await $('.brands-name>ul>li>a[href="/brand_products/Kookie Kids"]');
        await kokyKidsItem.click();
        const categoryName = await $('.features_items>h2');
        await expect(categoryName).toHaveText('BRAND - KOOKIE KIDS PRODUCTS');
        
    });
    it('check select another item from brands item is H&M', async() => {
        const HMItem = await $('.brands-name>ul>li>a[href="/brand_products/H&M"]');
        await HMItem.click();
        const categoryName = await $('.features_items>h2');
        await expect(categoryName).toHaveText('BRAND - H&M PRODUCTS');
        
    });
});