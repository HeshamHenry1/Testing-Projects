beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify PIN Field', () => {
    it(' PIN must be numeric', async() => {
        const pinInput = await $('[name="pinno"]');
        await pinInput.setValue('123PIN');
        const warnMessagePin = await $('#message6');
        await expect(warnMessagePin).toHaveText('Characters are not allowed');

        
        
    });
    it('PIN cannot be empty', async() => {
        const pinInput = await $('[name="pinno"]');
        const telephonInput = await $('[name="telephoneno"]');
        await pinInput.setValue('');
        await telephonInput.setValue('00001111');
        const warnMessagePin = await $('#message6');
        await expect(warnMessagePin).toHaveText('PIN Code must not be blank');
        
    });
    it('PIN must have 6 digits', async() => {
        const pinInput = await $('[name="pinno"]');
        await pinInput.setValue('00000');
        const warnMessagePin = await $('#message6');
        await expect(warnMessagePin).toHaveText('PIN Code must have 6 Digits');
        await pinInput.clearValue();
        await pinInput.setValue('000');
        await expect(warnMessagePin).toHaveText('PIN Code must have 6 Digits');

    });
    it('PIN cannot have special character', async() => {
        const pinInput = await $('[name="pinno"]');
        await pinInput.setValue('!@#');
        const warnMessagePin = await $('#message6');
        await expect(warnMessagePin).toHaveText('Special characters are not allowed');
        await pinInput.clearValue();
        await pinInput.setValue('123!@#');
        await expect(warnMessagePin).toHaveText('Special characters are not allowed');

        
    });
    it('PIN cannot have first blank space', async() => {
        const pinInput = await $('[name="pinno"]');
        await pinInput.setValue(' 00000');
        const warnMessagePin = await $('#message6');
        await expect(warnMessagePin).toHaveText('First character cannot be space');
        
    });
    it.only('PIN cannot have blank space', async() => {
        const pinInput = await $('[name="pinno"]');
        await pinInput.setValue('000 00');
        const warnMessagePin = await $('#message6');
        await expect(warnMessagePin).toHaveText('PIN cannot have space');
        
    });
    
});