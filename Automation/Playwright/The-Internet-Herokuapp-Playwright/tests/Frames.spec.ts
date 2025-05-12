import { test, expect } from '@playwright/test';

test.describe('Frames  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href="/frames"]').click();
    });
    test('switch to iframe ', async ({ page }) => {
        await page.pause();
        await page.locator('a[href="/iframe"]').click();
        await page.getByRole('menuitem', { name: 'File' }).click();
        await page.getByRole('menuitem', { name: 'New document' }).click();
        await page.getByRole('menuitem', { name: 'Format' }).click();
        await page.getByText('Italic').click();
        await page.getByLabel('Align center').click();
        // Locate element inside frame
        const input = await page.frameLocator('#mce_0_ifr').locator('#tinymce');
        await input.fill('test');


    });
});