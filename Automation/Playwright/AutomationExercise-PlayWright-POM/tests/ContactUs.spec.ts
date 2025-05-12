import{test} from '@playwright/test'
import { HomePage } from "./Pages/HomePage.spec";
import { ContactUs } from './Pages/ContactUsPage.spec';
test.describe('Contact Us', async() => {
    let Home : HomePage ;
    let Contact : ContactUs;

    test.beforeEach(async({page})=>{
        Home = new HomePage(page);
        Contact = new ContactUs(page);
       
        await test.step('0- go to home page ',async()=>{
            await Home.goToHomePage();
        });
        await test.step('1- verify home page ',async()=>{
            await Home.verifyGoToHomePage();
        });
        await test.step('- pause to check ',async()=>{
            await Home.pausePage();
        });
    });
    test('Contact Us as Coustomer', async() => {
        await test.step(' 2-go to contact us page  ',async()=>{
            await Home.goToContactUsPage();
        });
        await test.step(' 3- check in touch word is visiable  ',async()=>{
            await Contact.checkGetInTouchVisiable();
        });
        await test.step(' 4- fill contact data   ',async()=>{
            await Contact.fillFormData('test','test@test.test','test','test test ');
        });
        await test.step(' 5- accept alert   ',async()=>{
            await Contact.acceptAlert();
        });
        await test.step(' 6- check success message   ',async()=>{
            await Contact.checkSuccessMessage();
        });
        
    });
})
