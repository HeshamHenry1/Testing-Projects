import { expect, Page, Locator } from '@playwright/test';

class ProductListPage {
    private page: Page;

    private productItemContainer = '.product-item'; 
    // Selector for the product title within a product item container
    private productTitleWithinItem = '.product-title a';
    // Selector for the 'Add to Cart' button within a product item container
    private addToCartButtonWithinItem = 'button.product-box-add-to-cart-button';
    // Selector for the 'Add to Wishlist' button within a product item container
    private addToWishlistButtonWithinItem = 'button.add-to-wishlist-button'; 
    // Selector for the price within a product item container
    private priceWithinItem = '.prices .actual-price';
    // Selector for the success notification bar
    private successNotification = '#bar-notification .success';

    constructor(page: Page) {
        this.page = page;
    }

    
    private async getProductContainerByName(productName: string): Promise<Locator> {
        // Find the product item container that contains the specific product name
        const productContainer = this.page.locator(this.productItemContainer)
            .filter({ has: this.page.locator(this.productTitleWithinItem, { hasText: productName }) });
        
        // Ensure the container is visible before returning
        await expect(productContainer, `Product container for '${productName}' should be visible`).toBeVisible();
        return productContainer;
    }

    
    async addProductToCartByName(productName: string): Promise<void> {
        const productContainer = await this.getProductContainerByName(productName);
        const addToCartButton = productContainer.locator(this.addToCartButtonWithinItem);
        
        await expect(addToCartButton, `Add to Cart button for '${productName}' should be visible`).toBeVisible();
        await addToCartButton.click();
    }

    async addProductToWishlistByName(productName: string): Promise<void> {
        const productContainer = await this.getProductContainerByName(productName);
        const addToWishlistButton = productContainer.locator(this.addToWishlistButtonWithinItem);

        await expect(addToWishlistButton, `Add to Wishlist button for '${productName}' should be visible`).toBeVisible();
        await addToWishlistButton.click();
    }

    async getProductPriceByName(productName: string): Promise<string> {
        const productContainer = await this.getProductContainerByName(productName);
        const priceLocator = productContainer.locator(this.priceWithinItem);

        await expect(priceLocator, `Price for '${productName}' should be visible`).toBeVisible();
        const price = await priceLocator.textContent();
        return price ? price.trim() : '';
    }

    
    async verifySuccessNotification(expectedMessagePart?: string): Promise<void> {
        const notification = this.page.locator(this.successNotification);
        await expect(notification).toBeVisible({ timeout: 10000 }); // Wait longer for notification
        if (expectedMessagePart) {
            await expect(notification).toContainText(expectedMessagePart);
        }
    }
    
   
    async goToProductDetailsPage(productName: string): Promise<void> {
        const productContainer = await this.getProductContainerByName(productName);
        const productTitleLink = productContainer.locator(this.productTitleWithinItem);
        
        await expect(productTitleLink, `Product title link for '${productName}' should be visible`).toBeVisible();
        await productTitleLink.click();
        
    }

}

export { ProductListPage };

