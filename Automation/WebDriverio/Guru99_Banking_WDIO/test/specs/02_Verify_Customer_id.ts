beforeEach(() => {
      browser.url('https://demo.guru99.com/V2/webpages/EditCustomer.php');
     browser.maximizeWindow();
});
describe('Verify Customer id', () => {
    it('Customer id cannot be empty', async() => {
        const customerIDInput = await $('[name="cusid"]');
        const warnMessageID = await $('#message14');
        const submitBtn = await $('[name="AccSubmit"]');
        await customerIDInput.setValue('');
        await submitBtn.click();
        await expect(warnMessageID).toHaveText('Customer ID is required');
    });
    it('Customer id must be numeric', async() => {
        const customerIDInput = await $('[name="cusid"]');
        const warnMessageID = await $('#message14');
        await customerIDInput.setValue('1234Acc');
        await expect(warnMessageID).toHaveText('Characters are not allowed');
        await customerIDInput.setValue('Acc123');
        await expect(warnMessageID).toHaveText('Characters are not allowed');
    });
    it('Customer id cannot have special character', async() => {
        const customerIDInput = await $('[name="cusid"]');
        const warnMessageID = await $('#message14');
        await customerIDInput.setValue('123!@#');
        await expect(warnMessageID).toHaveText('Special characters are not allowed');
        await customerIDInput.setValue('!@#');
        await expect(warnMessageID).toHaveText('Special characters are not allowed');
        
    });
    it.only('Valid Customer Id', async() => {
        const customerIDInput = await $('[name="cusid"]');
        const submitBtn = await $('[name="AccSubmit"]');
        await customerIDInput.setValue('44433');
        await submitBtn.click();
        
    });
  
    
});