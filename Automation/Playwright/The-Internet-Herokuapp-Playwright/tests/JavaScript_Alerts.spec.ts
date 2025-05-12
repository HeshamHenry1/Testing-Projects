import { test, expect } from '@playwright/test';

test.describe('Java Script Alert  ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="javascript_alerts"]').click();
    });
    test('Confirm and get Alert text', async ({ page }) => {
        await page.pause();
        page.on('dialog', dialog => console.log('Alert Text:', dialog.message()));
        page.on('dialog', dialog => dialog.accept());
        await page.getByText('Click for JS Alert').click();
        await expect(page.locator('#result')).toContainText('You successfully clicked an alert');

       
    });
    test('cancel js confirm', async({page}) => {
        await page.pause();
        page.on('dialog', dialog => console.log('Alert Text:', dialog.message()));
        page.on('dialog', dialog => dialog.dismiss());
        await page.getByText('Click for JS Confirm').click();
        await expect(page.locator('#result')).toContainText('You clicked: Cancel');
        
    });
    test('Accept js confirm', async({page}) => {
        await page.pause();
        page.on('dialog', dialog => console.log('Alert Text:', dialog.message()));
        page.on('dialog', dialog => dialog.accept());
        await page.getByText('Click for JS Confirm').click();
        await expect(page.locator('#result')).toContainText('You clicked: Ok');
    });
    test.only('send Message to prompt ', async({page}) => {
        await page.pause();
        page.on('dialog', dialog => console.log('Alert Text:', dialog.message()));
        page.on('dialog', dialog => dialog.accept('test'));
        await page.getByText('Click for JS Prompt').click();
        await expect(page.locator('#result')).toContainText('test');

        
    });
});