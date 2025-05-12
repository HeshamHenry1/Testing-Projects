import { test, expect, Page, Locator } from '@playwright/test';
class cartPage {
    private page :Page
    constructor(page:Page){
        this.page = page 
    }
    async verifyAddToCartButtonInAllProducts(): Promise<void> {
        const products = this.page.locator('.inventory_item');
        const count = await products.count();
      
        if (count === 0) {
          throw new Error('No products found on the page');
        }
      
        for (let i = 0; i < count; i++) {
          const product = products.nth(i);
          const addToCartButton = product.locator('button:has-text("Add to cart")');
      
          await expect(addToCartButton, `Missing Add to Cart button at product index ${i}`).toBeVisible();
        }
      }
      async addFirstProductToCartAndVerifyInCart(): Promise<void> {
        const firstAddToCartButton = this.page.locator('button:has-text("Add to cart")').first();
        await expect(firstAddToCartButton).toBeVisible();
        await firstAddToCartButton.click();
      
        // Check cart badge shows "1"
        const cartBadge = this.page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
      
        // Go to cart page
        const cartIcon = this.page.locator('.shopping_cart_link');
        await cartIcon.click();
      
        // Check product is visible in the cart
        const cartItem = this.page.locator('.cart_item');
        await expect(cartItem).toBeVisible();
      
        const productName = cartItem.locator('.inventory_item_name');
        const productPrice = cartItem.locator('.inventory_item_price');
        await expect(productName).toBeVisible();
        await expect(productPrice).toBeVisible();
      }
      async addMultipleProductsToCartAndVerify(count: number): Promise<void> {
        const addToCartButtons = this.page.locator('button:has-text("Add to cart")');
        const totalButtons = await addToCartButtons.count();
      
        if (count > totalButtons) {
          throw new Error(`Requested ${count} items, but only ${totalButtons} available.`);
        }
      
        for (let i = 0; i < count; i++) {
          await addToCartButtons.nth(i).click();
        }
      
        // Check cart badge shows correct number
        const cartBadge = this.page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText(`${count}`);
      
        // Go to cart page
        const cartIcon = this.page.locator('.shopping_cart_link');
        await cartIcon.click();
      
        const cartItems = this.page.locator('.cart_item');
        await expect(cartItems).toHaveCount(count);
      
        // Optional: verify each item has name & price
        for (let i = 0; i < count; i++) {
          const item = cartItems.nth(i);
          await expect(item.locator('.inventory_item_name')).toBeVisible();
          await expect(item.locator('.inventory_item_price')).toBeVisible();
        }
      }
      async verifyAddToCartChangesToRemoveAndRemoveProduct(): Promise<void> {
        const addToCartButton = this.page.locator('button:has-text("Add to cart")');
      
        // Click to add product to cart
        await addToCartButton.first().click();
      
        // Verify the button changed to Remove
        const removeButton = this.page.locator('button:has-text("Remove")');
        await expect(removeButton.first()).toBeVisible();
      
        // Click to remove product from cart
        await removeButton.first().click();
      
        // Verify the button changed back to Add to Cart
        await expect(addToCartButton.first()).toBeVisible();
      
        // Optional: Verify cart is empty (no items)
        const cartIcon = this.page.locator('.shopping_cart_link');
        await cartIcon.click();
      
        const cartItems = this.page.locator('.cart_item');
        await expect(cartItems).toHaveCount(0);
      }
      async verifyContinueShoppingRedirectsToProductPage(): Promise<void> {
        // Locate the cart icon and click it to navigate to the cart page
        const cartIcon = this.page.locator('.shopping_cart_link');
        await cartIcon.click();
      
        // Verify the user is on the cart page by checking for a specific cart element
        const cartPageTitle = this.page.locator('.cart_list');
        await expect(cartPageTitle).toBeVisible();
      
        // Locate and click the "CONTINUE SHOPPING" button
        const continueShoppingButton = this.page.locator('button:has-text("Continue Shopping")');
        await continueShoppingButton.click();
      
        // Verify the user is redirected to the product page by checking for a product list
        const productPageTitle = this.page.locator('.inventory_list');
        await expect(productPageTitle).toBeVisible();
      }
      
      
      
      
      
}
export{cartPage}