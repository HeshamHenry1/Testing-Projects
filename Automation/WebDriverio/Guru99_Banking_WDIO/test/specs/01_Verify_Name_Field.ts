beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify Name Field', () => {
    it('Name cannot be empty', async() => {
       
        const customerNameInput = await $('input[name="name"]');
        const dateOfBirth = await $('#dob');
        const customerCityInput = await $('input[name="city"]'); 
        const addressInput = await $('[name="addr"]');
        const stateInput = await $('[name="state"]');
        await customerNameInput.setValue('');
        await dateOfBirth.clearValue();
        await dateOfBirth.setValue('2024-02-05');
         const warningNameMessage = await $('#message');
        await expect(warningNameMessage).toBeDisplayed();
        await addressInput.setValue('test test');
        await customerCityInput.setValue('test');
        await stateInput.setValue('teststate');
       

        
    });

    it('Name cannot be numeric', async() => {
        const customerNameInput = await $('input[name="name"]');
        await customerNameInput.setValue('1234');
        const warningNameMessage = await $('#message');
        await expect(warningNameMessage).toHaveText('Numbers are not allowed');
        await customerNameInput.clearValue();
        await customerNameInput.setValue('name1234');
        await expect(warningNameMessage).toHaveText('Numbers are not allowed');



        
    });
    it('Name cannot have special characters', async() => {
        const customerNameInput = await $('input[name="name"]');
        await customerNameInput.setValue('name!@#');
        const warningNameMessage = await $('#message');
        await expect(warningNameMessage).toHaveText('Special characters are not allowed');
        await customerNameInput.clearValue();
        await customerNameInput.setValue('!@#');
        await expect(warningNameMessage).toHaveText('Special characters are not allowed');
        
    });
    it.only('Name cannot have first character as blank space', async() => {
        const customerNameInput = await $('input[name="name"]');
        await customerNameInput.setValue(' name');
        const warningNameMessage = await $('#message');
        await expect(warningNameMessage).toHaveText('First character cannot be space');
        
    });
});