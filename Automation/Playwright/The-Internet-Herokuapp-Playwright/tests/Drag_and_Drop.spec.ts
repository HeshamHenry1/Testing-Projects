import { test, expect } from '@playwright/test';

test.describe('Drag and Drop ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a[href*="drag_and_drop"]').click();
    });
    test('Drag and Drop Test', async ({ page }) => {
        await page.pause();
        const elementA = await page.locator('#column-a');
        const elementB = await page.locator('#column-b');
        // Get the initial positions of both elements
        const positionBefore = await elementB.boundingBox();
        // Perform the drag-and-drop operation
        await elementA.dragTo(elementB);
        // await elementA.dragAndDrop(elementB);
        // Get the final positions of both elements after the drag-and-drop
        const positionAfter = await elementB.boundingBox();
        // Check if the position of element B has changed after the drag-and-drop
        expect(positionBefore).not.toBe(positionAfter);
      });
})