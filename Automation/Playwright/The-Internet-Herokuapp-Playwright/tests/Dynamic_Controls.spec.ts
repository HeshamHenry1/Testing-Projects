import { test, expect } from '@playwright/test';

test.describe('Dynamic Controls ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="dynamic_controls"]').click();
    });
    test.only('Remove/add', async({page}) => {
        await page.pause();
        await page.locator('#checkbox-example>#checkbox>input').check();
        await page.locator('#checkbox-example>button').click();
        await expect(page.locator('#loading')).toBeVisible();
        await expect(page.locator('#message')).toBeVisible();
        await expect(page.locator('//button[text()="Add"]')).toBeVisible();
        await page.locator("//button[text()='Add']").click();
        await expect(page.locator('#message')).toContainText("It's back!");

        
    });
    test('Test disable Item After  Click Enable Button', async ({ page }) => {
        await page.pause();
        const item = await page.locator('#input-example>input[type="text"]');
        const disabledAttribute = await item.getAttribute('disabled');
        if (disabledAttribute === null) {
            console.log('The item is enabled.');
        } else {
            console.log('The item is disabled.');
        }

    });
    test('Check Disable Item Befor click Enable Button', async ({ page }) => {
        await page.pause();
        await expect(page.locator('#input-example>input')).toBeDisabled();
        await page.locator('#input-example>button').click();
        await expect(page.locator('#input-example>input')).not.toBeDisabled();
    });
    test('Write Input After Item Enable ', async({page}) => {
        await page.pause();
        await expect(page.locator('#input-example>input')).toBeDisabled();
        await page.locator('#input-example>button').click();
        await expect(page.locator('#input-example>input')).not.toBeDisabled();
        await page.locator('#input-example>input').fill('test test');

        
    });
})