describe('View Category Products', () => {
    it('check category women dress', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const category = await $('.category-products');
        await expect(category).toBeExisting();
        const womenCategory = await $('[href="#Women"]');
        await womenCategory.click();
        const womenListCategory = await $('[id="Women"]>.panel-body');
        await expect(womenListCategory).toBeDisplayed();
        const dressItem = await $('[id="Women"]>.panel-body>ul>li>a[href="/category_products/1"]');
        await dressItem.click();
        const categoryName = await $('.features_items>h2');
        await expect(categoryName).toHaveText('WOMEN - DRESS PRODUCTS');

    });
    it('check men Tshirt  category ', async() => {
        const menCategory = await $('[href="#Men"]');
        await menCategory.click();
        const menListCategory = await $('[id="Men"]>.panel-body');
        await expect(menListCategory).toBeDisplayed();
        const tShirtItem = await $('[id="Men"]>.panel-body>ul>li>a[href="/category_products/3"]');
        await tShirtItem.click();
        const categoryName = await $('.features_items>h2');
        await expect(categoryName).toHaveText('MEN - TSHIRTS PRODUCTS');


        
    });
});