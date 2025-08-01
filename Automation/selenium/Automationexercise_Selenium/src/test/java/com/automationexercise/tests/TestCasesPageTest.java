package com.automationexercise.tests;
import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;


public class TestCasesPageTest {

    WebDriver driver;
    HomePage homePage;

    @BeforeMethod
    public void setup() {
        // 1. Launch browser
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // 2. Navigate to url 'http://automationexercise.com'
        driver.get("http://automationexercise.com" );


        homePage = new HomePage(driver);
    }

    @Test(description = "Test Case 7: Verify Test Cases Page")
    public void verifyTestCasesPageNavigation() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Click on 'Test Cases' button
        homePage.clickTestCasesLink();

        // 5. Verify user is navigated to test cases page successfully

        String expectedUrl = "https://automationexercise.com/test_cases";
        Assert.assertEquals(driver.getCurrentUrl( ), expectedUrl, "User is not navigated to the test cases page.");


        String pageTitle = driver.findElement(By.xpath("//h2/b[text()='Test Cases']")).getText();
        Assert.assertEquals(pageTitle, "TEST CASES", "Test Cases page title is not visible or incorrect.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
