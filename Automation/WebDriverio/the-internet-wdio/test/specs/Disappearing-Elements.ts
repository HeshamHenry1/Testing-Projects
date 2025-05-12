beforeEach(async() => {
    await browser.url("https://the-internet.herokuapp.com/disappearing_elements");
    await browser.maximizeWindow()
});
describe('Check this button on i click on it ', () => {
    it('Home Button ',async () => {
        const HomeButton = await $('#content > div > ul > li:nth-child(1) > a');
        await HomeButton.moveTo();
        await browser.pause(5000);
        await HomeButton.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/');

    });
    it.only('Check if element disapear or appear on i click again sometimes appear and not ', async() => {
        const disappearButton = await $('#content > div > ul > li:nth-child(5) > a');
        const HomeButton = await $('#content > div > ul > li:nth-child(1) > a');
        await HomeButton.moveTo();
        await HomeButton.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/');
        await browser.pause(3000);
        (await $('#content > ul > li:nth-child(9) > a')).click();
        await expect(disappearButton).toBeDisplayed();

    });
});