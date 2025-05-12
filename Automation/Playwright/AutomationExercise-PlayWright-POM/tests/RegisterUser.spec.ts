import { test, expect, Page } from '@playwright/test';
import { HomePage } from './Pages/HomePage.spec';
import{RegisterLogin}from'./Pages/RegLogPage.spec';
test.describe('Register User ',async()=>{
    let Home : HomePage;
    let Register : RegisterLogin;

    test.beforeEach(async({page})=>{
         Home = new HomePage(page);
         Register = new RegisterLogin(page);

         await test.step('1- go to home page', async() => {
            await Home.goToHomePage()
            
        });

        await test.step('2- check go to home page ', async() => {
            await Home.verifyGoToHomePage();
            
        });
        await test.step('pause to check ', async() => {
            await Home.pausePage();
            
        });

    });

    test('Register With Valid Data ', async() => {
       
        await test.step('3- go to  Register Page', async() => {
            await Home.goToRegLogPage();
            
        });

        await test.step('4- Creat Account ', async() => {
            await Register.creatNewAccount('PlayWrightTest','PlayWrightTest_1@test.com');
            
        });
        await test.step('5- Fill data of new account ', async() => {
            await Register.fillDataToNewAccount();
            
        });
        
        await test.step('6- check new account  ', async() => {
            await Register.checkNewRegAccount('PlayWrightTest');
            
        });
        
    });
    test.only('Register User with existing email', async() => {
        await test.step('3- go to  Register Page', async() => {
            await Home.goToRegLogPage();    
        });
        await test.step('4- Creat Account ', async() => {
            await Register.creatNewAccount('PlayWrightTest','PlayWrightTest_1@test.com');    
        });
        await test.step('Verify error message is visible',async()=>{
            await Register.verifyErrorMessageRegister();
        })
        
    });

});
