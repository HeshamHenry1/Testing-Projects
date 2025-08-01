package com.automationexercise.tests;
import com.automationexercise.pages.ContactUsPage;
import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.nio.file.Paths;
public class ContactUsTest {

    WebDriver driver;
    HomePage homePage;
    ContactUsPage contactUsPage;

    @BeforeMethod
    public void setup() {
        // 1. Launch browser
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // 2. Navigate to url 'http://automationexercise.com'
        driver.get("http://automationexercise.com" );


        homePage = new HomePage(driver);
        contactUsPage = new ContactUsPage(driver);
    }

    @Test(description = "Test Case 6: Contact Us Form")
    public void testContactUsForm() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Click on 'Contact Us' button
        homePage.clickContactUsLink();

        // 5. Verify 'GET IN TOUCH' is visible
        Assert.assertEquals(contactUsPage.getGetInTouchTitle(), "GET IN TOUCH", "'GET IN TOUCH' title is not visible.");

        // 6. Enter name, email, subject and message
        contactUsPage.fillContactForm("Test User", "test@example.com", "Test Subject", "This is a test message.");

        // 7. Upload file

        String filePath = Paths.get("src/main/resources/testfile.txt").toAbsolutePath().toString();
        contactUsPage.uploadFile(filePath);

        // 8. Click 'Submit' button
        contactUsPage.clickSubmitButton();

        // 9. Click OK button (on the alert)
        contactUsPage.acceptAlert();

        // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
        String expectedSuccessMessage = "Success! Your details have been submitted successfully.";
        Assert.assertEquals(contactUsPage.getSuccessMessage(), expectedSuccessMessage, "Success message is not visible or incorrect.");

        // 11. Click 'Home' button and verify that landed to home page successfully
        contactUsPage.clickHomeButton();


        Assert.assertEquals(driver.getCurrentUrl(), "https://automationexercise.com/", "Did not land back on the home page." );
    }
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
