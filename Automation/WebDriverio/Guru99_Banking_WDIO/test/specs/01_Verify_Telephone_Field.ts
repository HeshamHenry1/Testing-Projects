beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify Telephone Field', () => {
    it('Telephone cannot be empty', async() => {
        const telephonInput = await $('[name="telephoneno"]');
        const emailInput = await $('[name="emailid"]');
        await telephonInput.setValue('');
        await emailInput.setValue('test_2@gmail.com');
        const warnMessageState = await $('#message7');
        await expect(warnMessageState).toHaveText('Telephone no must not be blank');

        
    });
    it('Telephone cannot have first character as blank space', async() => {
        const telephonInput = await $('[name="telephoneno"]');
        await telephonInput.setValue('  123');
        const warnMessageState = await $('#message7');
        await expect(warnMessageState).toHaveText('First character cannot be space');
        
    });
    it('Telephone cannot have spaces', async() => {
        const telephonInput = await $('[name="telephoneno"]');
        await telephonInput.setValue('123 123');
        const warnMessageState = await $('#message7');
        await expect(warnMessageState).toHaveText('Telephone cannot have be space');
        
    });
    it.only('Telephone cannot have special character', async() => {
        const telephonInput = await $('[name="telephoneno"]');
        await telephonInput.setValue('886636!@12');
        const warnMessageState = await $('#message7');
        await expect(warnMessageState).toHaveText('Special characters are not allowed');
        await telephonInput.setValue('!@88662682');
        await expect(warnMessageState).toHaveText('Special characters are not allowed');
        await telephonInput.setValue('!8663682!@');
        await expect(warnMessageState).toHaveText('Special characters are not allowed');
        
    });
    
});