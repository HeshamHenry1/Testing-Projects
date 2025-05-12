describe('Add Products in Cart', () => {
    it('add first product in cart ', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const productBtn = await $('.shop-menu>ul>li>a[href="/products"]');
        await productBtn.click();
        const firstProduct = await $$('.single-products')[0];
        await firstProduct?.moveTo();
        const firstAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[0]
        await firstAddToCartBtn?.click();
        const model = await $('.modal-content');
        await expect(model).toBeDisplayed();
        const contShopBtn = await $('.modal-footer>button');
        await contShopBtn.click();
        const secondProduct = await $$('.single-products')[1];
        await secondProduct?.moveTo();
        const secondAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[1];
        await secondAddToCartBtn?.click();
        const viewCartBtn = await $('.text-center>a[href="/view_cart"]');
        await viewCartBtn.click();
        const tbody = await $('#cart_info_table > tbody');
        const productRows = await tbody.$$('tr'); // Select all product rows
        const numberOfProducts = productRows.length;
        console.log('Number of products in the table:', numberOfProducts);

    });
});