// updateProfilePage.ts
import { Page } from '@playwright/test';

export class UpdateProfilePage {
  readonly page: Page;
  readonly firstNameInput: string;
  readonly lastNameInput: string;
  readonly streetInput: string;
  readonly cityInput: string;
  readonly stateInput: string;
  readonly zipCodeInput: string;
  readonly phoneNumberInput: string;
  readonly updateProfileButton: string;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = '[id="customer.firstName"]';
    this.lastNameInput = '[id="customer.lastName"]';
    this.streetInput = '[id="customer.address.street"]';
    this.cityInput = '[id="customer.address.city"]';
    this.stateInput = '[id="customer.address.state"]';
    this.zipCodeInput = '[id="customer.address.zipCode"]';
    this.phoneNumberInput = '[id="customer.phoneNumber"]';
    this.updateProfileButton = 'button[name="Update Profile"]';
  }

  async updateProfile(
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: string
  ) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.streetInput, street);
    await this.page.fill(this.cityInput, city);
    await this.page.fill(this.stateInput, state);
    await this.page.fill(this.zipCodeInput, zipCode);
    await this.page.fill(this.phoneNumberInput, phoneNumber);
    await this.page.click(this.updateProfileButton);
  }

  async isProfileUpdated() {
    return await this.page.isVisible('div.profile-updated-message');
  }
}
