beforeEach(() => {
    browser.url('https://demo.guru99.com/V2/webpages/addcustomerpage.php')
    browser.maximizeWindow();
});
describe('creat customer ', () => {
    it('get customer id', async() => {
        const customerNameInput = await $('input[name="name"]');
        const dateOfBirth = await $('#dob');
        const addressInput = await $('[name="addr"]');
        const customerCityInput = await $('input[name="city"]'); 
        const stateInput = await $('[name="state"]');
        const pinInput = await $('[name="pinno"]');
        const telephonInput = await $('[name="telephoneno"]');
        const emailInput = await $('[name="emailid"]');
        await customerNameInput.setValue('guru');
        await dateOfBirth.clearValue();
        await dateOfBirth.setValue('05-03-2020');
        await addressInput.setValue('test');
        await customerCityInput.setValue('test');
        await stateInput.setValue('test');
        await pinInput.setValue('111111');
        await telephonInput.setValue('00001111');
        await emailInput.setValue('test_7@gmail.com');
        const submitBtn = await $('[name="sub"]');
        await submitBtn.click();
        if (await browser.isAlertOpen()) {
            await browser.getAlertText()
            
        }
        
    });
});