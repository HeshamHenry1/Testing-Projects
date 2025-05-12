import { test, expect } from '@playwright/test';

test.describe('Dropdown List  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="dropdown"]').click();
    });
    test('Dropdown Select Option', async ({ page }) => {
        await page.pause();
        await page.locator('#dropdown').selectOption('1');
        await expect(page.locator('#dropdown')).toHaveValue('1');
        await page.locator('#dropdown').selectOption('2');
        await expect(page.locator('#dropdown')).toHaveValue('2');



    });
    test.only('Dropdown Select Text', async({page}) => {
        await page.pause();
        const dropdown = await page.locator('#dropdown');
        await dropdown.selectOption({ label: 'Option 2' });
        await expect(page.locator('#dropdown')).toHaveValue('2');
        
    });
});