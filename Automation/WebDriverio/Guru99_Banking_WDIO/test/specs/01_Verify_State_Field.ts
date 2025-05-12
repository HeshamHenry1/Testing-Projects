beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify State Field', () => {
    it('State cannot be empty', async() => {
        const stateInput = await $('[name="state"]');
        const pinInput = await $('[name="pinno"]');
        await stateInput.setValue('');
        await pinInput.setValue('000000');
        const warnMessageState = await $('#message5');
        await expect(warnMessageState).toHaveText('State must not be blank');
    });
    it('State cannot be numeric', async() => {
        const stateInput = await $('[name="state"]');
        await stateInput.setValue('1234');
        const warnMessageState = await $('#message5');
        await expect(warnMessageState).toHaveText('Numbers are not allowed');
        await stateInput.clearValue();
        await stateInput.setValue('city123');
        await expect(warnMessageState).toHaveText('Numbers are not allowed');

        
    });
    it('State cannot have special', async() => {
        const stateInput = await $('[name="state"]');
        await stateInput.setValue('State!@#');
        const warnMessageState = await $('#message5');
        await expect(warnMessageState).toHaveText('Special characters are not allowed');
        await stateInput.clearValue();
        await stateInput.setValue('!@#');
        await expect(warnMessageState).toHaveText('Special characters are not allowed');

        
    });
    it.only('State cannot have first blank space', async() => {
        const stateInput = await $('[name="state"]');
        await stateInput.setValue(' state');
        const warnMessageState = await $('#message5');
        await expect(warnMessageState).toHaveText('First character cannot be space');
        
    });
});