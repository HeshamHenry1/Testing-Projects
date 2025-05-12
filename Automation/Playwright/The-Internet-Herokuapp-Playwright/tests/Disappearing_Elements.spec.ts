import { test, expect } from '@playwright/test';

test.describe('Disapearing Elements ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="disappearing_elements"]').click();
    });
    test('Page Refresh and Element Count Check', async ({ page }) => {
        let refreshCount = 0;
        const minRefreshAttempts = 3;
        const maxRefreshAttempts = 5;

        while (refreshCount < maxRefreshAttempts) {
            // Refresh the page
            await page.reload();

            // Get the count of `<li>` elements
            const liCount = await page.$$eval('ul > li', lis => lis.length);

            // Log the number of `<li>` elements after each refresh
            console.log(`After refresh ${refreshCount + 1}, number of <li> elements: ${liCount}`);

            // Check if there are at least five `<li>` elements
            if (liCount >= 5) {
                console.log('At least five `<li>` elements found.');
                break; // Exit the loop if there are at least five `<li>` elements
            } else {
                console.log('Less than five `<li>` elements found. Refreshing page...');
                refreshCount++;
            }
        }

        // Check if the loop exited because the minimum refresh attempts are reached
        if (refreshCount === maxRefreshAttempts && refreshCount < minRefreshAttempts) {
            console.log(`The page was refreshed ${refreshCount} times, but still, less than three refresh attempts.`);
        }
    });
});
