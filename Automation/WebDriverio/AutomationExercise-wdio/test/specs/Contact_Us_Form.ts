describe('Contact Us Form', () => {
    it(' fill informayion in contact us form ', async() => {
        await browser.url( 'http://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        const contactBtn = await $('.shop-menu>ul>li>a[href="/contact_us"]');
        await contactBtn.click();
        const contactUsWord = await $('.col-sm-12>h2');
        await expect(contactUsWord).toBeDisplayed();
        const nameInput = await $('[name="name"]');
        const emailInput = await $('[name="email"]');
        const subjectInput = await $('[name="subject"]');
        const messageInput = await $('#message');
        await nameInput.setValue('test');
        await emailInput.setValue('test_11@gmail.com');
        await subjectInput.setValue('test');
        await messageInput.setValue('test test');
        const uploadFileInput = await $('[name="upload_file"]');
        await uploadFileInput.setValue('C:/Users/Start/Downloads/webdriverIO.png');
        const submitBtn = await $('[name="submit"]');
        await submitBtn.click();
        await browser.acceptAlert();
        const successMessage = await $('.status.alert-success');
        await expect(successMessage).toBeDisplayed();
        const homeBtn = await $('.btn-success');
        await homeBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/');


    });
    
});