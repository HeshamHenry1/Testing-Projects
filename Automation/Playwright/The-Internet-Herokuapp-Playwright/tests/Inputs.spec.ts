import { test, expect } from '@playwright/test';

test.describe('Inputs  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="inputs"]').click();
    });
    test('add a number and add it ', async({page}) => {
        await page.pause();
        await page.getByRole('spinbutton').fill('0');
        for (let i = 0; i < 3; i++) {
         await page.getByRole('spinbutton').press('ArrowUp');
            
        }

        await expect(page.getByRole('spinbutton')).toHaveValue('3');
    });
});