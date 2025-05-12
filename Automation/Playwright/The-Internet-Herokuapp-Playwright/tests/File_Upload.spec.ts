import { test, expect } from '@playwright/test';

test.describe('Upload File  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href="/upload"]').click();
    });
    test('Upload File From Device', async ({ page }) => {
        await page.pause();
        // Start waiting for file chooser before clicking. Note no await.
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator('#file-upload').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('C:/Users/Start/Desktop/The-Internet-Herokuapp-Playwright/tests/Dawnload_Item/sample.png');
        await page.locator('#file-submit').click();
        await expect(page.locator('.example>h3')).toContainText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toContainText('sample.png');


    });
});