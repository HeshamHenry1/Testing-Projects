import { test, expect } from '@playwright/test';

test.describe('Floating Menu  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="floating_menu"]').click();
    });
    test('Scroll Down and test Menu be Visiable', async({page}) => {
        await page.pause();
        await page.evaluate("window.scrollTo(0, 500)");
        await expect(page.locator('#menu')).toBeVisible();
        
    });
});