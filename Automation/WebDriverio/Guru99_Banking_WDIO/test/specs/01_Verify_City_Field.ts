beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify City Field', () => {
    it('City cannot be empty', async() => {
        const customerCityInput = await $('input[name="city"]'); 
        const stateInput = await $('[name="state"]');
        await customerCityInput.setValue('');
        await stateInput.setValue('teststate');
        const warnMessageCity = await $('#message4');
        await expect(warnMessageCity).toHaveText('City Field must be not blank');


        
    });
    it('City cannot be numeric', async() => {
        const customerCityInput = await $('input[name="city"]'); 
        await customerCityInput.setValue('1234');
        const warnMessageCity = await $('#message4');
        await expect(warnMessageCity).toHaveText('Numbers are not allowed');
        await customerCityInput.clearValue();
        await customerCityInput.setValue('city123');
        await expect(warnMessageCity).toHaveText('Numbers are not allowed');


        
    });
    it('City cannot have special character', async() => {
        const customerCityInput = await $('input[name="city"]'); 
        await customerCityInput.setValue('City!@#');
        const warnMessageCity = await $('#message4');
        await expect(warnMessageCity).toHaveText('Special characters are not allowed');
        await customerCityInput.clearValue();
        await customerCityInput.setValue('!@#');
        await expect(warnMessageCity).toHaveText('Special characters are not allowed');
        
    });
    it.only('City cannot have first blank space', async() => {
        const customerCityInput = await $('input[name="city"]'); 
        await customerCityInput.setValue(' City');
        const warnMessageCity = await $('#message4');
        await expect(warnMessageCity).toHaveText('First character cannot be space');
        
    });
});