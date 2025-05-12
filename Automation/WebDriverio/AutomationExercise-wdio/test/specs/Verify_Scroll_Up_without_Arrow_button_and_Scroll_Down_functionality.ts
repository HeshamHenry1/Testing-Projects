describe('Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
    it('Verify Scroll Up without Arrow button', async() => {
        await browser.url('https://automationexercise.com/')
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        await browser.execute(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        const subscription = await $('.single-widget');
        await expect(subscription).toBeDisplayed();
        browser.execute(() => {
            window.scrollTo(0, 0);
        });
        await browser.waitUntil(async () => {
            const scrollTop = await browser.execute(() => window.scrollY);
            return scrollTop === 0;
        }, { timeout: 5000, timeoutMsg: 'Page did not scroll up' });
        
    });
});