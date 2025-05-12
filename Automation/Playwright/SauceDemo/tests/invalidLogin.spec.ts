import{test} from '@playwright/test'
import { LoginPage } from'./pages/LoginPage.spec'
test.describe('Login',async()=>{
    let Login : LoginPage 
    test.beforeEach(async({page})=>{
        Login = new LoginPage(page)
        await test.step('0- go to home page ',async()=>{
            await Login.goToHomePage();
        })
        await test.step('1- verify go to home page',async()=>{
            await Login.verifyLoginPage;
        })    
        await test.step('2- pause to check',async()=>{
            await Login.pausePage();
        })     
    })
    test('log in  ', async() => {
        await test.step('3- invalid login ', async() => {
            await Login.login('standard_user11','secret_sauce11')
            
        });
        await test.step('4- vaerify show error message   ', async() => {
            await Login.verifyInvalidErrorMessage()
            
        });
    })

})


