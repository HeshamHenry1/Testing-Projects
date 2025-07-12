import { expect, Page } from '@playwright/test';
class RegisterPage{
    private page : Page ;
    constructor(page:Page){
        this.page = page ;
    }
    async verifyRegisterPageUrl() {
        await expect(this.page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F');
    }
 async fillDataOfRegistration(data: {
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  if (data.gender === 'male') {
    await this.page.locator('#gender-male').check();
  } else {
    await this.page.locator('#gender-female').check();
  }

  await this.page.locator('#FirstName').fill(data.firstName);
  await this.page.locator('#LastName').fill(data.lastName);
  await this.page.locator('#Email').fill(data.email);
  await this.page.locator('#Password').fill(data.password);
  await this.page.locator('#ConfirmPassword').fill(data.password);
}
async confirmRegistration(){
    await this.page.click('#register-button')
}
async checkRegistration() {
  const successMessage = this.page.locator('.result');

  if (await successMessage.isVisible()) {
    await expect(successMessage).toHaveText('Your registration completed');
  } else {
   
    const errorMessages = this.page.locator('.field-validation-error, .message-error');
    const count = await errorMessages.count();

    console.log('\n❌ Registration failed. Found error messages:');
    for (let i = 0; i < count; i++) {
      console.log(await errorMessages.nth(i).innerText());
    }

    throw new Error('❌ Registration failed — see above error messages.');
  }
}
async verifyPasswordMismatchError() {
  const errorMessage = this.page.locator('#ConfirmPassword-error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('The password and confirmation password do not match.');
}
async verifyPasswordRequirementsError() {
  const passwordError = this.page.locator('#Password-error');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toHaveText('Password must meet the following rules: must have at least 6 characters and not greater than 64 characters');
}



}


export{RegisterPage}