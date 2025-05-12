describe('Upload File', () => {
    it('Upload file dirctly', async() => {
        await browser.url('https://the-internet.herokuapp.com/upload');
        await browser.maximizeWindow();
        const inputUpFile = await $('#file-upload');
        await inputUpFile.setValue('C:/Users/Start/Downloads/webdriverIO.png');
        const submitButton = await $('#file-submit');
        await submitButton.click();
        await browser.pause(3000);
    });
});