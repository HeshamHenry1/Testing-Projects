describe('form authentacation', ()=> {
    it('log in page with email and password',async()=> {
       await browser.url('https://the-internet.herokuapp.com/login');
       await browser.maximizeWindow();
        await  $('#username').setValue('tomsmith');
        await  $('#password').setValue('SuperSecretPassword!');
         await $('[type="submit"]').click();
         await expect($('[class="flash success"]')).toBeDisplayed();
        await $('[class="icon-2x icon-signout"]').click();
    });
});


