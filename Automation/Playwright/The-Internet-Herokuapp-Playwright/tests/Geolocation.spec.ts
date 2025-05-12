import { test, expect } from '@playwright/test';

test.describe('Geolocation  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href="/geolocation"]').click();
    });
    test('Where IM', async({page}) => {
        await page.pause();
        await page.getByText('Where am I?').click();
        await expect(page.locator('.example>#demo')).toBeVisible();
        await page.locator('#map-link').click();
        await expect(page.url()).toContain('google.com/maps');
    });
});