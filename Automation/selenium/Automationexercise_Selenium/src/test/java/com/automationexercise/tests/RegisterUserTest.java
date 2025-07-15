package com.automationexercise.tests;
import com.automationexercise.pages.AccountCreatedPage;
import com.automationexercise.pages.AccountInformationPage;
import com.automationexercise.pages.HomePage;
import com.automationexercise.pages.signLoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class RegisterUserTest {
    WebDriver driver;
    HomePage homePage;
    signLoginPage signupLoginPage;
    AccountInformationPage accountInformationPage;
    AccountCreatedPage accountCreatedPage;
    private String registeredUsername;
    private String registeredEmail;
    private String registeredPassword;
    private final String EXISTING_EMAIL = "testuser1752497563280@example.com";

    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );
        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);
        accountInformationPage = new AccountInformationPage(driver);
        accountCreatedPage = new AccountCreatedPage(driver);
    }



    @Test(description = "Test Case 1: Register User Successfully")
    public void registerUserSuccessfullyAndVerifyAccount() {
        // 1. Launch browser & 2. Navigate to url 'http://automationexercise.com'

        // 3. Verify that home page is visible successfully
        Assert.assertEquals(homePage.getHomePageTitle(), "Automation Exercise", "Home page title does not match");

        // 4. Click on 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Verify 'New User Signup!' is visible
        Assert.assertEquals(signupLoginPage.getNewUserSignupText(), "New User Signup!", "'New User Signup!' text is not visible");

        // 6. Enter name and email address
        this.registeredUsername = "TestUser" + System.currentTimeMillis(); // Unique name
        this.registeredEmail = "testuser" + System.currentTimeMillis() + "@example.com";
        this.registeredPassword = "password123"; // كلمة المرور المستخدمة في التسجيل

        signupLoginPage.enterSignupName(this.registeredUsername);
        signupLoginPage.enterSignupEmail(this.registeredEmail);

        // 7. Click 'Signup' button
        signupLoginPage.clickSignupButton();

        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        Assert.assertEquals(accountInformationPage.getEnterAccountInformationText(), "ENTER ACCOUNT INFORMATION", "'ENTER ACCOUNT INFORMATION' text is not visible");

        // 9. Fill details: Title, Name, Email, Password, Date of birth
        accountInformationPage.selectTitle("Mr.");
        accountInformationPage.enterPassword("password123");
        accountInformationPage.selectDateOfBirth("10", "January", "1990");

        // 10. Select checkbox 'Sign up for our newsletter!'
        accountInformationPage.checkNewsletterCheckbox();

        // 11. Select checkbox 'Receive special offers from our partners!'
        accountInformationPage.checkSpecialOffersCheckbox();

        // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        accountInformationPage.fillAddressDetails(
                "Test",
                "User",
                "Test Company",
                "123 Test Street",
                "Apt 1",
                "United States",
                "California",
                "Los Angeles",
                "90001",
                "1234567890"
        );

        // 13. Click 'Create Account button'
        accountInformationPage.clickCreateAccountButton();

        // 14. Verify that 'ACCOUNT CREATED!' is visible
        Assert.assertEquals(accountCreatedPage.getAccountCreatedText(), "ACCOUNT CREATED!", "'ACCOUNT CREATED!' text is not visible");

        // to us login
        printRegisteredUserDetails();

        // 15. Click 'Continue' button
        accountCreatedPage.clickContinueButton();
        // 16. Verify that 'Logged in as username' is visible
        Assert.assertTrue(homePage.getLoggedInAsUsernameText().contains(this.registeredUsername), "'Logged in as username' text is not visible or incorrect");

        // 17. Click 'Delete Account' button
       // homePage.clickDeleteAccountLink();

        // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button


    }

    private void printRegisteredUserDetails() {
        System.out.println("=============================================");
        System.out.println("User Registered Successfully! Details below:");
        System.out.println("Username: " + this.registeredUsername);
        System.out.println("Email: " + this.registeredEmail);
        System.out.println("Password: " + this.registeredPassword);
        System.out.println("=============================================");
    }
    @Test(description = "Test Case 5: Register User with existing email")
    public void registerWithExistingEmail() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Click on 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Verify 'New User Signup!' is visible
        Assert.assertEquals(signupLoginPage.getNewUserSignupText(), "New User Signup!", "'New User Signup!' text is not visible");

        // 6. Enter name and already registered email address
        signupLoginPage.enterSignupName("Any Name");
        signupLoginPage.enterSignupEmail(EXISTING_EMAIL);

        // 7. Click 'Signup' button
        signupLoginPage.clickSignupButton();

        // 8. Verify error 'Email Address already exist!' is visible
        String expectedErrorMessage = "Email Address already exist!";
        String actualErrorMessage = signupLoginPage.getSignupErrorMessage(); // نفترض وجود هذه الدالة
        Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "The error message for existing email is incorrect or not visible.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }


}
