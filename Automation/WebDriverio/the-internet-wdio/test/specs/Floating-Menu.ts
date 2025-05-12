describe('handle floating menu', () => {
    it('Handle floating menu by Scroll into last page', async() => {
        await browser.url('https://the-internet.herokuapp.com/floating_menu');
        await browser.maximizeWindow();
        await browser.scroll(0, 10000); // Scrolls to 1000 pixels down
        await browser.pause(3000);
        const homeButton = await $('#menu > ul > li:nth-child(1) > a');
        await homeButton.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/floating_menu#home');
        await browser.pause(3000);

    });
});