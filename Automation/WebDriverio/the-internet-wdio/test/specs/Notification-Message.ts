beforeEach('open and maximize page',async () => {
    await browser.url('https://the-internet.herokuapp.com/notification_message_rendered');
    await browser.maximizeWindow();
})
describe('Notification Message', () => {
    it('Test message notification will appear when click on button ', async() => {
        const clickBtn = await $('[href="/notification_message"]');
        await clickBtn.click();
        const notficationMessage = await $('#flash');
         await expect(notficationMessage).toBeDisplayed();
    });
});