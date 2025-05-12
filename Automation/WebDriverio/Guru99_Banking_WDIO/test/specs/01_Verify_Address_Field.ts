beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify Address Field', () => {
    it('Address cannot be empty', async() => {
        const customerCityInput = await $('input[name="city"]'); 
        const addressInput = await $('[name="addr"]');
        await addressInput.setValue('');
        await customerCityInput.setValue('test');
        const warnMessageAddress = await $('#message3');
        await expect(warnMessageAddress).toBeDisplayed();


        
    });
    it.only('Address cannot have first blank space', async() => {
         
        const addressInput = await $('[name="addr"]');
        await addressInput.setValue(' test');
        const warnMessageAddress = await $('#message3');
        await expect(warnMessageAddress).toBeDisplayed();
        
    });
    
});