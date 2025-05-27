import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
  }

  async registerUser(data: {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    ssn: string,
    username: string,
    password: string
  }) {
    await this.page.locator('[id="customer\\.firstName"]').fill(data.firstName);
    await this.page.locator('[id="customer\\.lastName"]').fill(data.lastName);
    await this.page.locator('[id="customer\\.address\\.street"]').fill(data.address);
    await this.page.locator('[id="customer\\.address\\.city"]').fill(data.city);
    await this.page.locator('[id="customer\\.address\\.state"]').fill(data.state);
    await this.page.locator('[id="customer\\.address\\.zipCode"]').fill(data.zipCode);
    await this.page.locator('[id="customer\\.phoneNumber"]').fill(data.phone);
    await this.page.locator('[id="customer\\.ssn"]').fill(data.ssn);
    await this.page.locator('[id="customer\\.username"]').fill(data.username);
    await this.page.locator('[id="customer\\.password"]').fill(data.password);
    await this.page.locator('#repeatedPassword').fill(data.password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async expectSuccessMessage() {
    await expect(this.page.getByText('Your account was created successfully.')).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
