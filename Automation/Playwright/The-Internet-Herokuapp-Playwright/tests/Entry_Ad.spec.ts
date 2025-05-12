import { test, expect } from '@playwright/test';

test.describe('Entry Ads  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="entry_ad"]').click();
    });
    test('When page Open Ad will Open ', async({page}) => {
        await page.pause();
        await expect(page.locator('.modal')).toBeVisible();
        const modelContent = await page.locator('.modal-body').innerText();
        console.log('Model Content : '+modelContent);
        await page.locator('.modal-footer>p').click();
        await expect(page.locator('.modal')).not.toBeVisible();

    });
})