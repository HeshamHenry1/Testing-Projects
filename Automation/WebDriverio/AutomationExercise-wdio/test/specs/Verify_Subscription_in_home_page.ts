describe('Verify Subscription in Cart page', () => {
    it('Verify Subscription in Cart page by enter my email', async() => {
        await browser.url('https://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        // await browser.execute(() => {
        //  window.scrollTo(0, document.documentElement.scrollHeight);
        // })
        const endElement = await $('#footer'); 
        await endElement.scrollIntoView();
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