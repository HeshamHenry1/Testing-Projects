beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/drag_and_drop');
    await browser.maximizeWindow();
});
describe('Handle Drag and Drop Element', () => {
    it(' drag and drop more than one time',async () => {
        const dragElement = await $('#column-a');
        const dropElement = await $('#column-b');
        await dragElement.dragAndDrop(dropElement, { duration:3000 });
        await browser.pause(5000);
        await dropElement.dragAndDrop(dragElement, { duration:3000 });
        await browser.pause(5000);
        
    });
});


 