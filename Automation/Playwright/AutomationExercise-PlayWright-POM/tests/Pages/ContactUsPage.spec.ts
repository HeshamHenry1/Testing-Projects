import { test, expect, Page } from '@playwright/test';

class ContactUs{
    private page : Page;
    constructor(page:Page){
        this.page = page;
    }
    async checkGetInTouchVisiable(){
        const getInTouch = await this.page.locator('.contact-form h2');
        await expect(getInTouch).toBeVisible();
        await expect(getInTouch).toHaveText('Get In Touch');
    }
    async fillFormData(Name:string , Email:string , Subject:string , Message:string){
        await this.page.getByPlaceholder('Name').fill(Name);
        await this.page.getByPlaceholder('Email', { exact: true }).fill(Email);
        await this.page.getByPlaceholder('Subject').fill(Subject);
        await this.page.getByPlaceholder('Your Message Here').fill(Message);
        await this.page.locator('input[name="upload_file"]').setInputFiles('IMG-20230607-WA0002.jpg'); 
     }
     async acceptAlert(){
        this.page.on('dialog', dialog => console.log(dialog.message()));
         this.page.on('dialog', dialog => dialog.accept());
         await this.page.getByRole('button', { name: 'Submit' }).click();
      }
      async checkSuccessMessage(){
        await expect(this.page.locator('div[class="status alert alert-success"]')).toHaveText('Success! Your details have been submitted successfully.');
        await this.page.locator('//span[text()=" Home"]').click();
     }
}
export{ContactUs}