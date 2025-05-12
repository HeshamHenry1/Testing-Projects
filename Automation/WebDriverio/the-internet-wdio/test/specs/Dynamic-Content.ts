beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/dynamic_content');
    await browser.maximizeWindow();
});
describe('Handle Dynamic Page', () => {
    it('Handle by compare initial content not equal new content ', async()=>{
        const initialContent = (await $('#content > div:nth-child(1)')).getText();
        const imageSrcIntial = await $('#content > div:nth-child(1) > div.large-2.columns > img').getAttribute('src');
        await browser.refresh();
        await browser.pause(3000);
        const newContent = (await $('#content > div:nth-child(1)')).getText();
        const imageSrcNew = await $('#content > div:nth-child(1) > div.large-2.columns > img').getAttribute('src');
        if(initialContent!==newContent&&imageSrcIntial!== imageSrcNew){
            console.log('This Page is adynamically page');
        }


    })
});