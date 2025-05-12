describe('Add review on product', () => {
    it('Add review on product', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const productBtn = await $('.shop-menu>ul>li>a[href="/products"]');
        await productBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/products');
        const viewCartBtn = await $('[href="/product_details/1"]');
        await viewCartBtn.click();
        const writeReview = await $('a[href="#reviews"]');
        await expect(writeReview).toBeDisplayed();
        const nameInput = await $('#name');
        const emailInput = await $('#email');
        const reviewInput = await $('[name="review"]');
        const subBtn = await $('button#button-review');
        await nameInput.setValue('test');
        await emailInput.setValue('test_5@gmail.com');
        await reviewInput.setValue('test test ');
        await subBtn.click();
        const alertSuccess = await $('.alert-success >span');
        await expect(alertSuccess).toBeDisplayed();
        
    });
    
});