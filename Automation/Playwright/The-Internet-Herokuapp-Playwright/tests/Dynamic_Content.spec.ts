import { test, expect } from '@playwright/test';

test.describe('Dynamic Content ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="dynamic_content"]').click();
    });
    test('Test Dynamic Content and Link Functionality', async ({ page }) => {
        await page.pause();
        // Get the initial content
        const initialContent = await page.textContent('body');  
        // Refresh the page
        await page.reload();
        // Get the content after refresh
        const refreshedContent = await page.textContent('body');
        // Verify that the content changes after refresh
        await expect(initialContent).not.toEqual(refreshedContent);
        // Click on the link
        await page.click('a[href$="?with_content=static"]');
        // Get the URL after clicking the link
        const urlAfterClick = page.url();
        // Verify that the URL contains "?with_content=static" after clicking the link
        await expect(urlAfterClick).toContain('?with_content=static');
      });
})