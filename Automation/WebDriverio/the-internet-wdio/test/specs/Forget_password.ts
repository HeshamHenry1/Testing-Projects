describe('Forget Password', () => {
    it('restore password', async() => {
        await browser.url('https://the-internet.herokuapp.com/');
        await browser.maximizeWindow();
        await browser.pause(3000);
        (await $('[href="/forgot_password"]')).click();
        (await $('[class="no-js"]')).waitForExist({timeout:3000});
        (await $('[name="email"]')).setValue('test@gmail.com');
         await browser.pause(2000);
        (await $('#form_submit')).click();
         await browser.pause(3000);
    });
});

