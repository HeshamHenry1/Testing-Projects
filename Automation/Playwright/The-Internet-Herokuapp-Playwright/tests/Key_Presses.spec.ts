import { test, expect } from '@playwright/test';

test.describe('Key Presses  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="key_presses"]').click();
    });
    test('Enter any press show the last press', async({page}) => {
        await page.pause();
        await page.keyboard.type('a');
        await expect(page.locator('#result')).toContainText('A');
        await page.keyboard.type('b');
        await expect(page.locator('#result')).toContainText('B');
        
    });
});