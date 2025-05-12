describe('Add to cart from Recommended items', () => {
    it('Add to cart from Recommended items', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const recomendedItem = await $('.recommended_items')
        await recomendedItem.scrollIntoView();
        await expect(recomendedItem).toBeExisting();
        const addtoCardBtn_RecoItem = await $$('.recommended_items .single-products>.productinfo>a');
        await addtoCardBtn_RecoItem[3].click();
        const viewCartBtn = await $('.text-center>a[href="/view_cart"]');
        await viewCartBtn.click();
        const tbody = await $('#cart_info_table > tbody');
        const productRows = await tbody.$$('tr'); // Select all product rows
        const numberOfProducts = productRows.length;
        console.log('Number of products in the table:', numberOfProducts);
    });
});