beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/dropdown');
    await browser.maximizeWindow();
});
describe('Handle Dropdown more than one way', () => {
    it('Hadle by Visiable Text', async() => {
        const selectInput = await $('#dropdown');
        await selectInput.selectByVisibleText('Option 2');
        await browser.pause(3000);
    });
    it.only('select by index', async() => {
        const selectInput = await $('#dropdown');
        await selectInput.selectByIndex(2);
        await browser.pause(3000);

        
    });
});