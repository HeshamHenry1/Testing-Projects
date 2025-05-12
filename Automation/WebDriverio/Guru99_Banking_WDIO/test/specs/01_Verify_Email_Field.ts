beforeEach('open and maximize', async()=>{
    await browser.url('https://demo.guru99.com/V1/html/addcustomerpage.php');
    await browser.maximizeWindow();
})
describe('Verify Email Field', () => {
    it('Email cannot be empty', async() => {
        const telephonInput = await $('[name="telephoneno"]');
        const emailInput = await $('[name="emailid"]');
        await emailInput.setValue('');
        await telephonInput.setValue('00001111');
        const warnMessageState = await $('#message9');
        await expect(warnMessageState).toHaveText('Email-ID must not be blank');
        
        
    });
    it('Email must be in correct format', async() => {
        const emailInput = await $('[name="emailid"]');
        const warnMessageState = await $('#message9');
        await emailInput.setValue('guru99@gmail '); 
        await expect(warnMessageState).toHaveText('Email-ID is not valid');
        await emailInput.setValue('guru99 '); 
        await expect(warnMessageState).toHaveText('Email-ID is not valid');
        await emailInput.setValue('Guru99@ '); 
        await expect(warnMessageState).toHaveText('Email-ID is not valid');
        await emailInput.setValue('guru99@gmail. '); 
        await expect(warnMessageState).toHaveText('Email-ID is not valid');
        await emailInput.setValue('guru99gmail.com'); 
        await expect(warnMessageState).toHaveText('Email-ID is not valid');
        
    });
    it.only('Email cannot have space', async() => {
        const emailInput = await $('[name="emailid"]');
        const warnMessageState = await $('#message9');
        await emailInput.setValue('  guru99@gmail.com '); 
        await expect(warnMessageState).toHaveText('Email-ID is not valid');

        
    });
    
});