import { test, expect } from '@playwright/test';
test.describe('Context Menu ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*=context_menu]').click();

    })
    test('Right Click Alert will open ', async ({ page }) => {
        await page.pause();
        await page.locator('#hot-spot').click({
            button: 'right',
        });
        const dialog = await page.waitForEvent('dialog');

        // Get the message from the dialog
        const message = await dialog.message();

        // Print the alert message
        console.log(message);

        // Accept the dialog
        await dialog.accept();
        // page.once('dialog', async dialog => {
        //     console.log(await dialog.message());
        //     await dialog.accept();
        //   });

    });
})