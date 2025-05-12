describe('Search Products and Verify Cart After Login', () => {
    it('search product ', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const productBtn = await $('.shop-menu>ul>li>a[href="/products"]');
        await productBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/products');
        const searchInput = await $('input#search_product');
        const submitSearch = await $('button#submit_search');
        await searchInput.setValue('top');
        await submitSearch.click();
    });
    it('check the result of product ', async() => {
        const productNameList = await $$('.productinfo>p');
        for(let i =0; i<productNameList.length;i++){
            if((await productNameList[i].getText()).includes('Top')){
                console.log('Top');
            }
        }
    });
    it('Add Product in cart', async() => {
        const firstProduct = await $$('.single-products')[0];
        await firstProduct?.moveTo();
        const firstAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[0]
        await firstAddToCartBtn?.click();
        const contShop = await $('.btn-block');
        await contShop.click();
        const secondProduct = await $$('.single-products')[1];
        await secondProduct?.moveTo();
        const secondAddToCartBtn = await $$('.product-overlay>.overlay-content>a')[1];
        await secondAddToCartBtn?.click();
        await contShop.click();
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/view_cart');
        const tbody = await $('#cart_info_table > tbody');
        const productRows = await tbody.$$('tr'); // Select all product rows
        const numberOfProducts = productRows.length;
        console.log('Number of products in the table:', numberOfProducts);

    });
    it('Login User ', async() => {
        const login_Signin_Btn = await $('a[href="/login"]');
        await login_Signin_Btn.click();
        const loginWord = await $('.login-form>h2');
        await expect(loginWord).toBeDisplayed();
        const emailInput = await $('form[action="/login"]>input[name="email"]');
        const passwordInput = await $('form[action="/login"]>input[name="password"]');
        const loginBtn = await $('form[action="/login"]>button');
        await emailInput.setValue('test_5@gmail.com');
        await passwordInput.setValue('testtest');
        await loginBtn.click();
        const accountName = await $('.shop-menu>ul>li>a>b');
        await expect(accountName).toBeDisplayed();
    });
    it(' Verify that those products are visible in cart after login as well', async() => {
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/view_cart');
        const tbody = await $('#cart_info_table > tbody');
        const productRows = await tbody.$$('tr'); // Select all product rows
        const numberOfProducts = productRows.length;
        console.log('Number of products in the table:', numberOfProducts);
        
    });
});