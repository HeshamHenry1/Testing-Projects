beforeEach('open and maximize page',async () => {
    await browser.url('https://the-internet.herokuapp.com/javascript_alerts');
    await browser.maximizeWindow();
})
describe('Handle Alert', () => {
    it('handle Js Alert',async () => {
        const buttonJsAlert = await $('#content > div > ul > li:nth-child(1) > button');
        await buttonJsAlert.click();
        await browser.acceptAlert();
        const checkResult = await $('#result');
        await expect(checkResult).toHaveText('You successfully clicked an alert');
        await browser.pause(5000);
        // await expect(checkResult).toBeDisplayed();
        
    });
    it('handle Js confirm click ok',async () => {
        const buttonJsConf= await $('#content > div > ul > li:nth-child(2) > button');
        await buttonJsConf.click();
        await browser.acceptAlert();
         const CheckResult = await $('#result');
         await expect(CheckResult).toHaveText('You clicked: Ok');
         await browser.pause(5000);
        
    })
    it('handle Js confirm click cancel',async () => {
        const buttonJsConf= await $('#content > div > ul > li:nth-child(2) > button');
        await buttonJsConf.click();
        await browser.dismissAlert();
         const CheckResult = await $('#result');
         await expect(CheckResult).toHaveText('You clicked: Cancel');
         await browser.pause(5000);
        
    })
    it.only('Handle Js Prompt',async () => {
        const buttonJsPrompt = await $('#content > div > ul > li:nth-child(3) > button');
        await buttonJsPrompt.click();
        const text = "Hi Im Henry";
        await browser.sendAlertText(text);
        await browser.acceptAlert();
        const CheckResult = await $('#result');
        await expect(CheckResult).toHaveText('You entered: '+ text);
        await browser.pause(5000);



        
    });
    
});