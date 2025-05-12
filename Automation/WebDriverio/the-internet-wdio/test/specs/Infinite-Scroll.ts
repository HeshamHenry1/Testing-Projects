beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/');
    await browser.maximizeWindow();
});
describe('Ifinit Scroll', () => {
    it('how i test when i scroll to end of page anew document addes', async() => {
        (await $('[href="/infinite_scroll"]')).click();
        await browser.pause(2000);
        
        for(let i = 0 ; i<3; i++){
            await browser.executeScript('window.scrollTo(0, document.body.scrollHeight)', [i]);
             await $$('[class="jscroll-added"]')[i].isExisting();
             await browser.pause(2000);

        }
 

    });
});