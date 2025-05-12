describe('Hovers', () => {
    it('Try handle when i hover in image his properties appear', async() => {
        (await $('[href="/hovers"]')).click();
        await browser.pause(2000);
        await $$('[class="figure"]')[0].moveTo();
        await $$('[class="figcaption"]')[0].isDisplayed();
        await browser.pause(2000);
        await $$('[class="figure"]')[1].moveTo();
        await $$('[class="figcaption"]')[1].isDisplayed();
        await browser.pause(2000);
        await $$('[class="figure"]')[2].moveTo();
        await $$('[class="figcaption"]')[2].isDisplayed();
        (await $('[href="/users/3"]')).click();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/users/3');
       


    });
});