import { test, expect } from '@playwright/test';

test.describe('Form Authentication  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href="/login"]').click();
    });
    test('Valid Login', async({page}) => {
        await page.pause();
        await page.locator('#username').fill('tomsmith');
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.locator('[type="submit"]').click();
        await expect(page.locator('[class="flash success"]')).toBeVisible();
        
    });

});