beforeEach('Open and Maximize Page',async () => {
 await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
 await browser.maximizeWindow();
})
describe('Add and Remove Element by click one time', () => {
    it('test add element', async() => { 
        const addButton = await $('#content button');
        await addButton.click();
        const deleteButton = await $('#elements > button');
        await expect(deleteButton).toBeDisplayed();
        await browser.pause(5000);
        await deleteButton.click();
        await expect(deleteButton).not.toBeDisplayed();
        

    });
    it.only('when i click more than one time', async() => {
        const addButton = await $('#content > div > button');
        const deleteButton = await $('#elements > button');
        for(let i =0 ; i<4; i++){
            await addButton.click();
        }
        await browser.pause(5000);
        for(let j =0; j<4; j++){
            await deleteButton.click();
        }
        


        
    });
});