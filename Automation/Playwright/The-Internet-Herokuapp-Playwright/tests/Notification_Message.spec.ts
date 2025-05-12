import { test, expect } from '@playwright/test';

test.describe('Notification Message  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="notification_message"]').click();
    });
    test('Check Notification Message', async({page}) => {
        await page.pause();
        const alertMessage = await page.locator('#flash').innerText();
        console.log('Alert Messag : '+alertMessage);
        await page.locator('a[href*="notification_message"]').click();
        const alertMessage_2 = await page.locator('#flash').innerText();
        console.log('Alert Messag : '+alertMessage_2);




        
    });
});