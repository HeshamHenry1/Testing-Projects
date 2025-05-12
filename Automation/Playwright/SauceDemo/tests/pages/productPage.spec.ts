import { test, expect, Page, Locator } from '@playwright/test';
class productPage{
   
    private page : Page 
    productPageTitle: string;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    constructor(page:Page){
        this.page = page;
        
        this.productPageTitle = '.inventory_list';
        this.sortDropdown = page.locator('select[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    }
    async verifyGoToProductPage(): Promise<void> {
        // Wait for the product page title or an element on the page to appear
        await this.page.waitForSelector(this.productPageTitle);
    
        // Optionally, verify the URL is the product page URL
        const currentURL = await this.page.url();
        if (!currentURL.includes('/inventory.html')) {
          throw new Error('User is not on the product page');
        }}
        async checkProductVisiable(){
          const count = await this.page.locator('.inventory_item').count();
          expect(count).toBeGreaterThan(0);
        }
        async verifyAllProductsHaveNameImagePrice(): Promise<void> {
          const products = this.page.locator('.inventory_item');
          const count = await products.count();
          
          if (count === 0) {
            throw new Error('No products found on the page');
          }
        
          for (let i = 0; i < count; i++) {
            const product = products.nth(i);
            const name = product.locator('.inventory_item_name');
            const image = product.locator('.inventory_item_img img');
            const price = product.locator('.inventory_item_price');
        
            // Check visibility
            await expect(name, `Missing product name at index ${i}`).toBeVisible();
            await expect(image, `Missing product image at index ${i}`).toBeVisible();
            await expect(price, `Missing product price at index ${i}`).toBeVisible();
        
            // Check content
            const nameText = await name.textContent();
            const priceText = await price.textContent();
            const imageSrc = await image.getAttribute('src');
        
            if (!nameText || nameText.trim() === '') {
              throw new Error(`Empty product name at index ${i}`);
            }
        
            if (!priceText || priceText.trim() === '') {
              throw new Error(`Empty product price at index ${i}`);
            }
        
            if (!imageSrc || imageSrc.trim() === '') {
              throw new Error(`Missing image src at index ${i}`);
            }
          }
        }
        
          async checkSortByNameAZ() {
            await this.sortDropdown.selectOption('az');
            const names = await this.productNames.allTextContents();
            const sorted = [...names].sort();
            expect(names).toEqual(sorted);
          }
          async CheckSortByNameZA() {
            await this.sortDropdown.selectOption('za');
            const names = await this.productNames.allTextContents();
            const sorted = [...names].sort().reverse();
            expect(names).toEqual(sorted);
          }
          async checkSortByPriceLowToHigh() {
            await this.sortDropdown.selectOption('lohi');
            const prices = await this.productPrices.allTextContents();
            const numbers = prices.map(p => parseFloat(p.replace('$', '')));
            const sorted = [...numbers].sort((a, b) => a - b);
            expect(numbers).toEqual(sorted);
          }
          async checkSortByPriceHighToLow() {
            await this.sortDropdown.selectOption('hilo');
            const prices = await this.productPrices.allTextContents();
            const numbers = prices.map(p => parseFloat(p.replace('$', '')));
            const sorted = [...numbers].sort((a, b) => b - a);
            expect(numbers).toEqual(sorted);
          }
          async checkProductAndVerifyDetails(): Promise<void> {
           
            const firstProduct = this.page.locator('div[class="inventory_item_name "]').first();
            await firstProduct.click();
          
          
            const productName = this.page.locator('.inventory_details_name');
            const productImage = this.page.locator('.inventory_details_img'); 
            const productPrice = this.page.locator('.inventory_details_price');
            const addToCartButton = this.page.locator('button[data-test^="add-to-cart"]');
          
        
            await Promise.all([
              expect(productName).toBeVisible(),
              expect(productImage).toBeVisible(),
              expect(productPrice).toBeVisible(),
              expect(addToCartButton).toBeVisible(),
            ]);
        }
        
        
          
}
export{productPage}