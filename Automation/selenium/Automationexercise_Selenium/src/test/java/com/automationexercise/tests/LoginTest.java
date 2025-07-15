package com.automationexercise.tests;

import com.automationexercise.pages.AccountDeletedPage;
import com.automationexercise.pages.HomePage;
import com.automationexercise.pages.signLoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LoginTest {

    WebDriver driver;
    HomePage homePage;
    signLoginPage signupLoginPage;
    AccountDeletedPage accountDeletedPage;

    // Define a static user for consistent testing, or register one in a @BeforeSuite method
    private static final String REGISTERED_EMAIL =  "testuser1752483079184@example.com"; // + System.currentTimeMillis()
    private static final String REGISTERED_PASSWORD = "password123";
    private static final String REGISTERED_USERNAME =  "TestUser1752483079184";

    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );
        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);
        accountDeletedPage = new AccountDeletedPage(driver);
    }

    @Test
    public void loginUserWithCorrectCredentials() {
        // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'


        // 3. Verify that home page is visible successfully
        Assert.assertEquals(homePage.getHomePageTitle( ), "Automation Exercise", "Home page title does not match");

        // 4. Click on 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Verify 'Login to your account' is visible
        Assert.assertEquals(signupLoginPage.getLoginToYourAccountText(), "Login to your account", "'Login to your account' text is not visible");

        // 6. Enter correct email address and password
        signupLoginPage.enterLoginEmail(REGISTERED_EMAIL);
        signupLoginPage.enterLoginPassword(REGISTERED_PASSWORD);

        // 7. Click 'login' button
        signupLoginPage.clickLoginButton();

        // 8. Verify that 'Logged in as username' is visible
        Assert.assertTrue(homePage.getLoggedInAsUsernameText().contains(REGISTERED_USERNAME), "'Logged in as username' text is not visible or incorrect");

        // 9. Click 'Delete Account' button
        homePage.clickDeleteAccountLink();

        // 10. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        Assert.assertEquals(accountDeletedPage.getAccountDeletedText(), "ACCOUNT DELETED!", "'ACCOUNT DELETED!' text is not visible");
        accountDeletedPage.clickContinueButton();

        // Optional: Verify that user is redirected to home page after deleting account
        Assert.assertEquals(homePage.getHomePageTitle(), "Automation Exercise", "Home page title does not match after account deletion");
    }

    @Test
    public void loginUserWithIncorrectCredentials() {

        // 1- 5
        homePage.clickSignupLoginLink();
        Assert.assertEquals(signupLoginPage.getLoginToYourAccountText(), "Login to your account", "'Login to your account' text is not visible");

        // 6. Enter incorrect email address and password
        signupLoginPage.enterLoginEmail("incorrect@test.com");
        signupLoginPage.enterLoginPassword("wrongpassword");

        // 7. Click 'login' button
        signupLoginPage.clickLoginButton();

        // 8. Verify error 'Your email or password is incorrect!' is visible
        String expectedErrorMessage = "Your email or password is incorrect!";
        String actualErrorMessage = signupLoginPage.getLoginErrorMessage();
        Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "Incorrect error message for invalid login");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

