beforeEach('open and maximize page',async () => {
    await browser.url('https://the-internet.herokuapp.com/key_presses');
    await browser.maximizeWindow();
})
describe('Key Process', () => {
    it('Test if Give any charachter in input will display on screen ', async() => {
        const InputField = await $('#target');
        const passingValue = "B";
        await InputField.setValue(passingValue);
        const MessageAppear = await $('#result');
        await expect(MessageAppear).toBeDisplayed();
        await expect(MessageAppear).toHaveText('You entered: '+passingValue);
        await browser.keys("\b");
        await expect(MessageAppear).toHaveText('You entered: BACK_SPACE');

        
        
    });
    it.only('Test if give text display last char ', async() => {
        const InputField = await $('#target');
        const passingValue = "Hesham";
        await InputField.setValue(passingValue);
        const MessageAppear = await $('#result');
        await expect(MessageAppear).toBeDisplayed();
        await expect(MessageAppear).toHaveText('You entered: '+passingValue[passingValue.length-1].toUpperCase());
    });
});