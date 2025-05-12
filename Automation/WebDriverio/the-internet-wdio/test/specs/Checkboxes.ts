describe('check boxes', () => {
    it('check right in check boxes',async () => {
        await browser.url('https://the-internet.herokuapp.com/checkboxes');
        await browser.maximizeWindow();
        const firstButton = await $('#checkboxes > input[type=checkbox]:nth-child(1)');
        await firstButton.click();
        const secondButton = await $('#checkboxes > input[type=checkbox]:nth-child(3)');
        await secondButton.click();
    });
});