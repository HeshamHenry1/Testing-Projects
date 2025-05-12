beforeEach(async() => {
    await browser.url('https://the-internet.herokuapp.com/');
    await browser.maximizeWindow();
});
describe('Geolocation ', () => {
    it('how to find yoirself by ip ', async() => {
       (await $('[href="/geolocation"]')).click();
       await browser.pause(2000);
       (await $('[onclick="getLocation()"]')).click();
       (await $('#demo')).waitForDisplayed({timeout:2000});
       (await $('[href*=maps]')).click();
       await browser.pause(5000);
     
       
    });
});