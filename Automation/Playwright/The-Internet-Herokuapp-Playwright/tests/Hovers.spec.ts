import { test, expect } from '@playwright/test';

test.describe('Hovers  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="hovers"]').click();
    });
    test('When Hover Element Data Will Display', async({page}) => {
        await page.pause();
        await page.locator('img[src*="blank.jpg"]').first().hover();
        await expect(page.locator('.figcaption>h5').first()).toBeVisible();
        await expect(page.locator('.figcaption>h5').first()).toContainText('name: user1');
        await expect(page.locator('.figcaption>a[href="/users/1"]')).toBeVisible();
        await expect(page.locator('.figcaption>a[href="/users/1"]')).toContainText('View profile');
        await page.locator('img[src*="blank.jpg"]').nth(1).hover();
        await expect(page.locator('.figcaption>h5').nth(1)).toBeVisible();
        await expect(page.locator('.figcaption>h5').nth(1)).toContainText('name: user2');
        await expect(page.locator('.figcaption>a[href="/users/2"]')).toContainText('View profile');
        await page.locator('img[src*="blank.jpg"]').nth(2).hover();
        await expect(page.locator('.figcaption>h5').nth(2)).toBeVisible();
        await expect(page.locator('.figcaption>h5').nth(2)).toContainText('name: user3');
        await expect(page.locator('.figcaption>a[href="/users/3"]')).toContainText('View profile');




        
    });
});