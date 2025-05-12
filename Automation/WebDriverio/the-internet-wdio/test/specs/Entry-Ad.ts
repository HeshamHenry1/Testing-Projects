describe('Entry Ad send message in view port page', () => {
    it('test handle view port page',async () => {
        await browser.url('https://the-internet.herokuapp.com/entry_ad');
        await browser.maximizeWindow();

        const clickHere = await $$('#restart-ad')[1];
        await clickHere?.click();
        const modelPage = await $('#modal > div.modal');
        await expect(modelPage).toBeDisplayed();

        const modelPageTitleText = await $('#modal > div.modal > div.modal-title > h3')
        await expect(modelPageTitleText).toHaveText('THIS IS A MODAL WINDOW');
        const modelPageBodyText = await $('#modal > div.modal > div.modal-body > p');
        await expect(modelPageBodyText).toHaveText("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).");
        const closeButton = await $('#modal > div.modal > div.modal-footer > p');
        await closeButton.moveTo();
        await closeButton.click();
        await browser.pause(3000);
    });
});