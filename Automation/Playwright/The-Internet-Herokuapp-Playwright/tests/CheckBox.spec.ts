import { test, expect } from '@playwright/test';
test.describe('Check Box ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*=checkbox]').click();

    })
    test('Check and Uncheck to test it', async({page}) => {
        await page.pause();
        await page.locator('input[type="checkbox"]').first().check();
        await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
        await page.locator('input[type="checkbox"]').last().uncheck();
        await expect(page.locator('input[type="checkbox"]').last()).not.toBeChecked();
    });
})