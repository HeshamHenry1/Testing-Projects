import { test, expect } from '@playwright/test';

test.describe('Infinite Scroll  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="infinite_scroll"]').click();
    });
    test('should add new documents when scrolled to the end of the page', async ({ page }) => {
        await page.pause();
        for (let i = 0; i < 3; i++) {
            // Scroll to the bottom of the page
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            // Wait for the new content to be added (assuming it has a specific class)
             await page.waitForSelector('.jscroll-added');
             for (let j = 0; j < 3; j++) {
                await expect(page.locator('.jscroll-added').nth(j)).toBeVisible();
            }
            
        }
    });
})