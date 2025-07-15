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

public class LogoutUserTest {
    WebDriver driver;
    HomePage homePage;
    signLoginPage signupLoginPage;
    //
    private final String REGISTERED_EMAIL = "testuser1752497563280@example.com";
    private final String REGISTERED_PASSWORD = "password123";
    private final String registeredUsername = "TestUser1752497563280" ;

    @BeforeMethod
    public void setupAndLogin() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );

        // تهيئة صفحات الـ Page Objects
        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);

        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // == الخطوة التحضيرية: تسجيل الدخول ==
        // 4. Click on 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Verify 'Login to your account' is visible
        Assert.assertTrue(signupLoginPage.getLoginToYourAccountText().equalsIgnoreCase("Login to your account"));

        // 6. Enter correct email address and password & 7. Click 'login' button
        signupLoginPage.login(REGISTERED_EMAIL, REGISTERED_PASSWORD); // نفترض وجود دالة مجمعة

        // 8. Verify that 'Logged in as username' is visible
        Assert.assertTrue(homePage.getLoggedInAsUsernameText().contains(registeredUsername), "'Logged in as username' text is not visible or incorrect");
    }


    @Test(description = "Test Case 4: Logout User")
    public void testUserLogout() {

        // 9. Click 'Logout' button
         homePage.clickLogoutLink();

        // 10. Verify that user is navigated to login page

        String expectedUrl = "https://automationexercise.com/login";
        Assert.assertEquals(driver.getCurrentUrl( ), expectedUrl, "User is not navigated to the login page after logout.");


    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }
    }

}
