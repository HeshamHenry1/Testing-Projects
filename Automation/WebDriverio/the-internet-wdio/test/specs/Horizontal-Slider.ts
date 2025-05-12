beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/');
    await browser.maximizeWindow();
});
describe('Horizental slider ', () => {
    it('try to handle horezental slider by mouse with click', async() => {
        (await $('[href="/horizontal_slider"]')).click();
        await browser.pause(2000);
        await browser.executeScript('arguments[0].focus();', [await $('[type="range"]')]);
        await $('[type="range"]').click({ x:60 });
        await browser.pause(2000);
    });
    it('try to handle horezental slider by mouse drag and drop', async() => {
         (await $('[href="/horizontal_slider"]')).click();
         await browser.pause(2000);
         const dragSlider = await $('[type="range"]') ;
         await browser.executeScript('arguments[0].focus();', [dragSlider]);
        
        
         await dragSlider.dragAndDrop({ x: 60,y:0});
         await browser.pause(2000);
         
    });
    it('try to handle horezental slider by  arrow key', async() => {
         (await $('[href="/horizontal_slider"]')).click();
         await browser.pause(2000);
         await browser.executeScript('arguments[0].focus();', [await $('[type="range"]')]);
         for(let i =0 ; i<4; i++){
         await browser.keys('ArrowRight'); 

         };
          // Send right arrow key
         await browser.pause(2000);
         
    });

});