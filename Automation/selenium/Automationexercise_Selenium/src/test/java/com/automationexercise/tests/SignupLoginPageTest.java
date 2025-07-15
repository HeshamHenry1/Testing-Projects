package com.automationexercise.tests;
import com.automationexercise.pages.HomePage;
import com.automationexercise.pages.signLoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class SignupLoginPageTest {
    WebDriver driver;
    HomePage homePage;
    signLoginPage signupLoginPage;

    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );
        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);
        homePage.clickSignupLoginLink(); // Navigate to Signup/Login page
    }
    @Test
    public void verifyLoginToYourAccountText() {
        String expectedText = "Login to your account";
        String actualText = signupLoginPage.getLoginToYourAccountText();
        Assert.assertEquals(actualText, expectedText, "'Login to your account' text is not visible");
    }
    @Test
    public void verifyNewUserSignupText() {
        String expectedText = "New User Signup!";
        String actualText = signupLoginPage.getNewUserSignupText();
        Assert.assertEquals(actualText, expectedText, "'New User Signup!' text is not visible");
    }
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

}
