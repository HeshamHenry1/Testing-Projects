import { test, expect, Page, Locator } from '@playwright/test';
class checkoutPage{
    private page: Page
    constructor(page:Page){
        this.page = page ;
    }
    async verifyCheckoutRedirectsToInfoPage(): Promise<void> {
        // Go to the cart page
        const cartIcon = this.page.locator('.shopping_cart_link');
        await cartIcon.click();
      
        // Verify the user is on the cart page by checking for a specific cart element
        const cartPageTitle = this.page.locator('.cart_list');
        await expect(cartPageTitle).toBeVisible();
      
        // Locate and click the "CHECKOUT" button
        const checkoutButton = this.page.locator('button:has-text("CHECKOUT")');
        await checkoutButton.click();
      
        // Verify the user is redirected to the information page by checking for a specific element on the info page
        const infoPageTitle = this.page.locator('.checkout_info');
        await expect(infoPageTitle).toBeVisible();
      }
      async verifyUserInfoFieldsOnCheckout(): Promise<void> {
        // Verify the First Name field is visible
        const firstNameField = this.page.locator('input[data-test="firstName"]');
        await expect(firstNameField).toBeVisible();
      
        // Verify the Last Name field is visible
        const lastNameField = this.page.locator('input[data-test="lastName"]');
        await expect(lastNameField).toBeVisible();
      
        // Verify the Zip Code field is visible
        const zipCodeField = this.page.locator('input[data-test="postalCode"]');
        await expect(zipCodeField).toBeVisible();
      }
      async verifyOrderSummary(): Promise<void> {
        // Verify each section of the summary is visible
        const itemTotal = this.page.locator('.summary_subtotal_label');
        const tax = this.page.locator('.summary_tax_label');
        const total = this.page.locator('.summary_total_label');
        const productItems = this.page.locator('.cart_item');
      
        await expect(productItems.first()).toBeVisible(); // Make sure at least one product is listed
        await expect(itemTotal).toBeVisible();
        await expect(tax).toBeVisible();
        await expect(total).toBeVisible();
      
        // Optional: You can extract and log the prices
        const itemTotalText = await itemTotal.textContent();
        const taxText = await tax.textContent();
        const totalText = await total.textContent();
      
        console.log('Item Total:', itemTotalText);
        console.log('Tax:', taxText);
        console.log('Total:', totalText);
      }
      async verifyOrderConfirmation(): Promise<void> {
        // Click the finish button
        await this.page.locator('[data-test="finish"]').click();
      
        // Confirm the user is redirected and the message is shown
        const confirmationHeader = this.page.locator('.complete-header'); // e.g. "THANK YOU FOR YOUR ORDER"
        const confirmationText = this.page.locator('.complete-text'); // Optional text below
        const confirmationImg = this.page.locator('.pony_express'); // Optional image
      
        await expect(confirmationHeader).toBeVisible();
        await expect(confirmationHeader).toHaveText(/thank you for your order/i);
        await expect(confirmationText).toBeVisible();
        await expect(confirmationImg).toBeVisible(); // if you want to check the image presence
      }
      async verifyErrorOnMissingCheckoutInfo(): Promise<void> {
        // Fill only Last Name and Zip Code, leave First Name empty
        await this.page.locator('[data-test="lastName"]').fill('TestLast');
        await this.page.locator('[data-test="postalCode"]').fill('12345');
      
        // Click Continue
        await this.page.locator('[data-test="continue"]').click();
      
        // Verify error message appears
        const errorMessage = this.page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(/first name is required/i);
      }
      async verifyCancelButtonOnCheckoutInfo(): Promise<void> {
        // Click the cancel button
        await this.page.locator('[data-test="cancel"]').click();
      
        // Verify URL redirected back to the product page
        await expect(this.page).toHaveURL(/.*cart.html/);
      
        //  Verify that cart page content is visible
  const cartItems = this.page.locator('.cart_item');
  await expect(cartItems).toBeVisible();
      }
      async fillUserInformation(firstName: string, lastName: string, zip: string): Promise<void> {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', zip);
        await this.page.click('input[type="submit"]');
      }
      
      async verifyOrderSummaryDetails(): Promise<void> {
        await expect(this.page.locator('.summary_info')).toBeVisible();
        await expect(this.page.locator('.summary_subtotal_label')).toContainText('Item total');
        await expect(this.page.locator('.summary_tax_label')).toContainText('Tax');
        await expect(this.page.locator('.summary_total_label')).toContainText('Total');
        await expect(this.page.locator('.cart_item')).toBeVisible(); // Verify product is listed
      }
      
      
      
            
      
      
}
export{checkoutPage}