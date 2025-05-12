describe('how to dawnload file', () => {
    it('', async() => {
        await browser.url('https://the-internet.herokuapp.com/download');
        await browser.maximizeWindow();
        const fileDawnload = await $('#content > div > a:nth-child(78)');
        await fileDawnload.click();
        await browser.pause(3000);
    });
});