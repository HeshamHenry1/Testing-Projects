describe('Verify Test Cases Page', () => {
    it(' I Check when i click test cases button', async() => {
        await browser.url('https://automationexercise.com');
        const body = await $('body');
        await expect(body).toBeDisplayed();
        const testCasesBtn= await $('.shop-menu>ul>li>a[href="/test_cases"]');
        await testCasesBtn.click();
        await expect(browser).toHaveUrl('https://automationexercise.com/test_cases');


    });
});