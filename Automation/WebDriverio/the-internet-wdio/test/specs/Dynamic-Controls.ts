beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/dynamic_controls');
    await browser.maximizeWindow();
});
describe('Hnadle Dynamic control wait to appear click add button and remove button  ', () => {
   it('handle button remove', async() => {
    const checkBox = await $('#checkbox > input[type=checkbox]');
    await checkBox.click();
    const removeButton = await $('#checkbox-example > button');
    await removeButton.click();
    const loading = await $('#loading');
    await loading.waitForExist({timeout:5000});
    await expect(loading).toBeExisting();
    const message = await $('#message');
    await message.waitForExist({ timeout: 5000 });
    await expect(message).toHaveText("It's gone!");
    const addButton = await $('#checkbox-example > button');
    await addButton.waitForExist({timeout:3000});
    await addButton.click();
    await loading.waitForExist({timeout:5000});
    await expect(loading).toBeExisting();
    await message.waitForExist({ timeout: 5000 });
    await expect(message).toHaveText("It's back!");
    const checkBoxField = await $('#checkbox-example > div:nth-child(3)');
    await expect(checkBoxField).toBeDisplayed();


    
    
   });

   it.only('Handle wait on click on enable and disable button',async () => {
       const enableButton = await $('#input-example > button');
       await enableButton.click();
       const loading = await $('#loading');
       await expect(loading).toBeDisplayed();
       const message = await $('#message');
       await message.waitForExist({timeout:5000});
       await expect(message).toBeDisplayed();
       await expect(message).toHaveText("It's enabled!");
       const input = await $('#input-example > input[type=text]');
       await input.isClickable()
       await input.setValue('mission done');
       await browser.pause(3000);

   });
});