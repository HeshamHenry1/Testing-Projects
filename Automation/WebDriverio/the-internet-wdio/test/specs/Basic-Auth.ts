describe('user and pass: admin in alert massage', () => {
    it('type two input in alert message never complete ', async() => {
        await browser.url('https://the-internet.herokuapp.com/basic_auth');
        await browser.maximizeWindow();
        // const Username = "Hesham Henry";
        // const Password = "12345678";
        const combinedText = 'Hesham Henry, 12345678';
        await browser.sendAlertText(combinedText);
        // await browser.sendAlertText(Username);
        await browser.pause(3000);
        // await browser.sendAlertText(Password);
        // await browser.pause(3000);
        await browser.acceptAlert();
        await browser.pause(3000);
    });
});