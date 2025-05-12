beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/');
    await browser.maximizeWindow();
});
describe('Inputs', () => {
    it('try to handle input number not valid Characters', async() => {
        (await $('[href="/inputs"]')).click();
        await browser.pause(2000);
        const numberInput = await $('input[type="number"]');
        await numberInput.setValue('1');  // Enter value using keyboard actions
        await expect(numberInput).toHaveValue('1');  // Verify value
        await browser.pause(2000);
        for (let index = 0; index <3; index++) {
            
            await browser.keys('ArrowUp');
        }
        
        await expect(numberInput).toHaveValue('4'); 
        await browser.pause(2000);


           await numberInput.setValue('');
           await browser.pause(2000);
           await numberInput.setValue('abc');  // Enter invalid value
           await expect(numberInput).toHaveValue(''); // Verify value remains empty
            

        
    });
});