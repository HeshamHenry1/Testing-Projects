describe('Verify Subscription in Cart page', () => {
    it('Verify Subscription in Cart page by enter my email', async() => {
        await browser.url('https://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        const cartBtn = await $('.shop-menu>ul>li>a[href="/view_cart"]');
        await cartBtn.click();
        const subsWord = await $('.single-widget>h2');
        await expect(subsWord).toBeDisplayed();
        const subsEmailInput = await $('#susbscribe_email');
        await subsEmailInput.setValue('test_11@gmail.com');
        const subsBtn = await $('#subscribe');
        await subsBtn.click();
        const alertSuccess = await $('.alert-success');
        await expect(alertSuccess).toBeDisplayed();
    })
})