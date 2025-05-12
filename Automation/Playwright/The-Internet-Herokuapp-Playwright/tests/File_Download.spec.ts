import { test, expect } from '@playwright/test';

test.describe('Download File  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href="/download"]').click();
    });
    test('Download File and Give Path ', async ({ page }) => {
        await page.pause();
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = page.waitForEvent('download');
        await page.locator('a[href*="download/sample.png"]').click();
        const download = await downloadPromise;

        // Wait for the download process to complete and save the downloaded file somewhere.
        await download.saveAs('C:/Users/Start/Desktop/The-Internet-Herokuapp-Playwright/tests/Dawnload_Item/' + download.suggestedFilename());
    });

});