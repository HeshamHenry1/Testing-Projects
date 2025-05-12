describe('Add New Customer', () => {
    it.only('Verify mandatory fields are required', async() => {
        await browser.url('https://demo.guru99.com/V2/webpages/addcustomerpage.php');
        const customerNameInput = await $('input[name="name"]');
        const dateOfBirth = await $('#dob');
        const customerCityInput = await $('input[name="city"]'); 
        const addressInput = await $('[name="addr"]');
        const stateInput = await $('[name="state"]');
        const pinInput = await $('[name="pinno"]');
        const telephonInput = await $('[name="telephoneno"]');
        const emailInput = await $('[name="emailid"]');

        await customerNameInput.setValue('testh');
        await dateOfBirth.clearValue();
        await dateOfBirth.setValue('05-03-2020');
        await addressInput.setValue('test ');
        await customerCityInput.setValue('test');
        await stateInput.setValue('test');
        await pinInput.setValue('000000');
        await telephonInput.setValue('00001111');
        await emailInput.setValue('test_6@gmail.com');
        const submitBtn = await $('[name="sub"]');
        await submitBtn.click();
       

        if(await browser.isAlertOpen()){
            await browser.getAlertText();
           
            
        }else{
            await browser.waitUntil( browser.isAlertOpen,{timeout:3000});
        }
        


        
        
        
        
        // const warningNameMessage = await $('#message');
        // await expect(warningNameMessage).toBeDisplayed();

        
    });

    it('Verify mandatory field validation', async() => {
        await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
        const customerNameInput = await $('input[name="name"]');
        const dateOfBirth = await $('#dob');
        const customerCityInput = await $('input[name="city"]'); 
        const addressInput = await $('[name="addr"]');
        const stateInput = await $('[name="state"]');
        const pinInput = await $('[name="pinno"]');
        const telephonInput = await $('[name="telephoneno"]');
        const emailInput = await $('[name="emailid"]');

        await customerNameInput.setValue('123456');
        const warningNameMessage = await $('#message');
        await expect(warningNameMessage).toHaveText('Numbers are not allowed');
        await dateOfBirth.clearValue();
        await dateOfBirth.setValue('05-03-2020');
        await addressInput.setValue('test test');
        await customerCityInput.setValue('test');
        await stateInput.setValue('teststate');
        await pinInput.setValue('000000');
        await telephonInput.setValue('00001111');
        await emailInput.setValue('test_2@gmail.com');
        const submitBtn = await $('[name="sub"]');
        await submitBtn.click();
        if(await browser.isAlertOpen()){
            await browser.getAlertText();
            await browser.acceptAlert();
        }else{
            await browser.waitUntil( browser.isAlertOpen,{timeout:3000});
        }
        
    });
});