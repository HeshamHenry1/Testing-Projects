import { test, expect } from '@playwright/test';
test.describe('Add and Remove Element', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="add_remove"]').click();

    })
    test('Check If I Click on Element Will Appear', async ({ page }) => {
        await page.pause();
        await page.getByText('Add Element').click();
        await expect(page.locator('//button[text()="Delete"]')).toBeVisible();
    });
    test('i want count if i Add More Than One Element', async ({ page }) => {
        await page.pause();
        for (let i = 0; i < 4; i++) {
         await page.getByText('Add Element').click();
        }
        const deleteButtonLocator = page.locator('//button[text()="Delete"]');
        const deleteButtonCount = await deleteButtonLocator.count();
        console.log(`Number of "Delete" buttons found: ${deleteButtonCount}`);
        
    });
    test.only('Check if Add Element Then I Remove it Will Disappear', async({page}) => {
        await page.pause();
        for (let i = 0; i < 4; i++) {
            await page.getByText('Add Element').click();
           }
           for (let j = 0; j < 4; j++) {
            await page.getByRole('button', { name: 'Delete' }).first().click()
           }
           await expect(page.locator('//button[text()="Delete"]')).not.toBeVisible();
        
    });
})