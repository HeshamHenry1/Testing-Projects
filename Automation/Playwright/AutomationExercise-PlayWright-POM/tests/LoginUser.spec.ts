import{test} from '@playwright/test'
import { HomePage } from "./Pages/HomePage.spec";
import{RegisterLogin}from'./Pages/RegLogPage.spec';
test.describe('Log in User', async() => {
    let Home : HomePage ;
    let Login : RegisterLogin;

    test.beforeEach(async({page})=>{
        Home = new HomePage(page);
        Login = new RegisterLogin(page);
        await test.step('0- go to home page ',async()=>{
            await Home.goToHomePage();
        })
        await test.step('1- verify go to home page',async()=>{
            await Home.verifyGoToHomePage();
        })    
        await test.step('pause to check',async()=>{
            await Home.pausePage();
        })     
    });
    test('Login User with correct email and password', async() => {
        await test.step('2- go to Login page ', async() => {
            await Home.goToRegLogPage();   
        });
        await test.step('3-  log in   ', async() => {
            await Login.login('PlayWrightTest_1@test.com','testtest');
        });
        await test.step('4- check log in   ', async() => {
            await Login.checkLogin('PlayWrightTest');
        });
        
    });
    test.only('Login User with incorrect email and password', async() => {
        await test.step('2- go to Login page ', async() => {
            await Home.goToRegLogPage();   
        });
        await test.step('3-  log in   ', async() => {
            await Login.login('PlayWrightTest_2@test.com','testtest2');
        });
        await test.step('4- Verify error message is visible', async() => {
            await Login.VerifyErrorMessageLogin();
        });
        
    });
    
});