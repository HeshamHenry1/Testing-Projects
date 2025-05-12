beforeEach('Open and Maximize Page',async () => {
    await browser.url('https://the-internet.herokuapp.com/context_menu');
    await browser.maximizeWindow();
   })
   describe('context menu', () => {
     it(' try right click in context menu', async() => {
        const box = await $('#hot-spot');
        // const myButton = await $('#myButton')
        await box.click({ button: 'right' });
        await browser.pause(5000);
        if(await browser.isAlertOpen()){
            await browser.acceptAlert();
        }
        
     });
   });