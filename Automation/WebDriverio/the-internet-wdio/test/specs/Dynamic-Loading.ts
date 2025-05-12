beforeEach(async() => {
     browser.url('https://the-internet.herokuapp.com/dynamic_loading');
     browser.maximizeWindow();
});
describe('Handle Dynamic loafing ', () => {
    it('hidden element will appear ', async() => {
        const example_1 = await $('#content > div > a:nth-child(5)');
        await example_1.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/dynamic_loading/1');
        const startButton = await $('#start > button');
        await startButton.click();
        const loadingImg = await $('#loading > img');
        await expect(loadingImg).toBeDisplayed();
        const hiddenElement = await $('#finish > h4');
        await hiddenElement.waitForDisplayed({timeout:10000});
        await expect(hiddenElement).toHaveText('Hello World!');
        await browser.pause(3000);
        
    });
    it.only('element page render it when click', async() => {
        const example_2 = await $('#content > div > a:nth-child(8)');
        await example_2.click();
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/dynamic_loading/2');
        const startButton = await $('#start > button');
        await startButton.click();
        const loadingImg = await $('#loading > img');
        await expect(loadingImg).toBeDisplayed();;
        const renderElement = await $('#finish > h4');
        await renderElement.waitForExist({timeout:10000});
        await expect(renderElement).toBeExisting();
        await browser.pause(3000);
    });
});