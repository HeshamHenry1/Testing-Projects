describe('Remove Products From Cart', () => {
    it('Add product to cart ', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const firstProduct = await $$('.single-products')[0];
        await firstProduct?.moveTo();
        const firstAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[0]
        await firstAddToCartBtn?.click();
        const contShop = await $('.btn-block');
        await contShop.click();
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/view_cart');
        
    });
    it('Remove product ', async() => {
        const product = await $('#product-1');
        await expect(product).toBeExisting();
        const removeBtn = await $('.cart_quantity_delete');
        await removeBtn.click();
        await expect(product).not.toBeExisting();
    });
});