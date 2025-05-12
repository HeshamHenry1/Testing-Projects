import { test, expect } from '@playwright/test';

test.describe('Horizontal Slider  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="horizontal_slider"]').click();
    });
    test('Slide by Keyes', async ({ page }) => {
        await page.pause();
        await page.getByRole('slider').press('ArrowRight');
        await page.getByRole('slider').press('ArrowRight');
        await page.getByRole('slider').press('ArrowRight');
        await page.getByRole('slider').press('ArrowRight');


    });
  

});