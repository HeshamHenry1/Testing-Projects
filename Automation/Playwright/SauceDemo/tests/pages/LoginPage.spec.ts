import { test, expect, Page } from '@playwright/test';

class LoginPage{
    private page : Page 
    usernameField: string;
  passwordField: string;
  loginButton: string;
  errorMessage: string;
  productPageTitle: string;
    constructor(page:Page){
        this.page = page;
        this.usernameField = 'input[name="user-name"]';  // The username input field
        this.passwordField = 'input[name="password"]';  // The password input field
        this.loginButton = 'input[type="submit"]';       // The login button
        this.errorMessage = '.error-message-container';   // The error message container
        this.productPageTitle = '.inventory_list';
    }

    async goToHomePage(){
        await this.page.goto('https://www.saucedemo.com/');
    }
    async verifyLoginPage(){
        // Check if username field is visible
    await this.page.waitForSelector(this.usernameField);
    // Check if password field is visible
    await this.page.waitForSelector(this.passwordField);
    // Check if login button is visible
    await this.page.waitForSelector(this.loginButton);

    }
    async login(username: string, password: string): Promise<void> {
        // Locate elements
        const logUsername = this.page.locator(this.usernameField);
        const logPassword = this.page.locator(this.passwordField);
        const logButton = this.page.locator(this.loginButton);
    
        // Fill username and password, then click the login button
        await logUsername.fill(username);
        await logPassword.fill(password);
        await logButton.click();
      }
      async verifyGoToProductPage(): Promise<void> {
        // Wait for the product page title or an element on the page to appear
        await this.page.waitForSelector(this.productPageTitle);
    
        // Optionally, verify the URL is the product page URL
        const currentURL = await this.page.url();
        if (!currentURL.includes('/inventory.html')) {
          throw new Error('User is not on the product page');
        }
      }
      async pausePage(){
        await this.page.pause();
    }
    async verifyInvalidErrorMessage(): Promise<void> {
      const errorLocator = this.page.locator(this.errorMessage);
      await expect(errorLocator).toBeVisible();
      await expect(errorLocator).toContainText('Epic sadface: Username and password do not match any user in this service');
    }
    async verifyLockedoutErrorMessage(): Promise<void> {
      const errorLocator = this.page.locator(this.errorMessage);
      await expect(errorLocator).toBeVisible();
      await expect(errorLocator).toContainText('Epic sadface: Sorry, this user has been locked out.');
    }



}
export{LoginPage}