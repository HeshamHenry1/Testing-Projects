import { Page, expect } from '@playwright/test';

export class UpdateProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await this.page.locator('input[name="username"]').fill('test_5');
    await this.page.locator('input[name="password"]').fill('test_5');
    await this.page.getByRole('button', { name: 'Log In' }).click();
    await this.page.locator('a[href*="updateprofile"]').click();
  }

  async fillFirstName(firstName: string) {
    await this.page.locator('[id="customer\\.firstName"]').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.locator('[id="customer\\.lastName"]').fill(lastName);
  }

  async fillStreet(street: string) {
    await this.page.locator('[id="customer\\.address\\.street"]').fill(street);
  }

  async fillCity(city: string) {
    await this.page.locator('[id="customer\\.address\\.city"]').fill(city);
  }

  async fillState(state: string) {
    await this.page.locator('[id="customer\\.address\\.state"]').fill(state);
  }

  async fillZipCode(zip: string) {
    await this.page.locator('[id="customer\\.address\\.zipCode"]').fill(zip);
  }

  async fillPhoneNumber(phone: string) {
    await this.page.locator('[id="customer\\.phoneNumber"]').fill(phone);
  }

  async clickUpdate() {
    await this.page.getByRole('button', { name: 'Update Profile' }).click();
  }

  async expectProfileUpdated() {
    await expect(this.page.getByRole('heading', { name: 'Profile Updated' })).toBeVisible();
  }

  async expectErrorMessage(msg: string) {
    await expect(this.page.getByText(msg)).toBeVisible();
  }

  async getFirstNameValue(): Promise<string> {
    return await this.page.locator('[id="customer\\.firstName"]').inputValue();
  }
}
