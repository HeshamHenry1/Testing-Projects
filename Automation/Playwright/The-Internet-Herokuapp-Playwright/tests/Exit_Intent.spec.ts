import { test, expect } from '@playwright/test';

test.describe('Exit Intent  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="exit_intent"]').click();
    });
    test('When mouse over out the model will appear ', async ({ page }) => {
        await page.pause();
        await page.mouse.move(100, 0);
        await page.mouse.move(0, 100);
        await expect(page.locator('.modal')).toBeVisible();
        const modelContent = await page.locator('.modal-body').innerText();
        console.log('Model Content : ' + modelContent);
        await page.locator('.modal-footer>p').click();
        await expect(page.locator('.modal')).not.toBeVisible();

    });
})