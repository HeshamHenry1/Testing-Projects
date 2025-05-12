beforeEach(() => {
    browser.url('https://demo.guru99.com/V3/manager/PasswordInput.php');
    browser.maximizeWindow();

});
describe('Change Password and Login', () => {
    it('Enter incorrect Old Password  ', async() => {
        const oldPassword = await $('input[name="oldpassword"]');
        const newPassword = await $('input[name="newpassword"]');
        const confirmPassword = await $('input[name="confirmpassword"]');
        const submitBtn = await $('input[name="sub"]');
        await oldPassword.setValue('a1@1');
        await newPassword.setValue('11a@a1');
        await confirmPassword.setValue('11a@a1');
        await submitBtn.click();
      
        if( await browser.isAlertOpen()){
              await browser.getAlertText();
            
       
        }
        
    });
    
});