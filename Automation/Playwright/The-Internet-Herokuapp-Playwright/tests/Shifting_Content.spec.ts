import { test, expect } from '@playwright/test';

test.describe('Shifting Element  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="shifting_content"]').click();
    });
    test('Shifting Content: Menu Element', async ({ page }) => {
        await page.pause();
        const menuElementHandle = await page.waitForSelector('.menu-element'); 

        if (menuElementHandle) {
            // Get the position or appearance of the menu element
            const menuPosition = await menuElementHandle.boundingBox();

            if (menuPosition) {
                // Print the position or appearance of the menu element to the console
                console.log('Menu Element Position:', menuPosition);
            } else {
                console.error('Failed to get menu element position');
            }
        } else {
            console.error('Menu element not found');
        }
    });
});