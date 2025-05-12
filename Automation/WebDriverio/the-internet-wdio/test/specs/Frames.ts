describe('Frames', () => {
    it(' use iframes to write in web page', async() => {
           
         await browser.url('https://the-internet.herokuapp.com/');
         await browser.maximizeWindow();
         (await $('[href="/frames"]')).click();
         (await $('[href="/iframe"]')).click();
         await browser.pause(2000);
         (await $('[class="tox tox-tinymce"]')).waitForDisplayed({timeout:3000});
         await $$('[role="menuitem"]')[0].click();
         (await $('[title="New document"]')).click();
         await browser.pause(2000);
         await browser.switchToFrame(await $('#mce_0_ifr'));
         (await $('#tinymce > p')).addValue('Hi Im Henry');
         await browser.pause(2000);
         await browser.switchToParentFrame();
         (await $('[title="styles"]')).click();
         (await $('[title="Headings"]')).moveTo();
         (await $('h1')).click();
         await browser.pause(2000);
         await $('[aria-label="Align center"]').click();
         await browser.pause(2000);
        
         

    });
});