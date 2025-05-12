describe('Search Product ', () => {
    it('Enter value in search input', async() => {
        await browser.url('http://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        const productBtn = await $('.shop-menu>ul>li>a[href="/products"]');
        await productBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/products');
        const productsList = await $('.features_items');
        await expect(productsList).toBeDisplayed();
        const searchInput = await $('#search_product');
        const searchBtn = await $('#submit_search');
        await searchInput.setValue('Tshirt');
        await searchBtn.click();
        const products= await $$('.productinfo>p');
        for (let index = 0; index<products.length; index++) {
            if((await products[index].getText()).includes('Tshirt')||(await products[index].getText()).includes('T-Shirt')){
                console.log('have tshirt');
            }
            
        }
    })
})