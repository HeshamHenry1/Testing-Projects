package com.automationexercise.tests;

import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class SubscriptionTest {

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

        // تهيئة صفحات الـ Page Objects
        homePage = new HomePage(driver);
    }

    @Test(description = "Test Case 10: Verify Subscription in home page")
    public void testHomePageSubscription() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Scroll down to footer
        homePage.scrollToFooter();

        // 5. Verify text 'SUBSCRIPTION'
        Assert.assertTrue(homePage.isSubscriptionTitleVisible(), "'SUBSCRIPTION' title is not visible in the footer.");

        // 6. Enter email address in input and click arrow button
        // نستخدم بريدًا إلكترونيًا فريدًا في كل مرة لتجنب مشاكل الاشتراك المسبق
        String emailToSubscribe = "test.subscribe." + System.currentTimeMillis() + "@example.com";
        homePage.subscribeWithEmail(emailToSubscribe);

        // 7. Verify success message 'You have been successfully subscribed!' is visible
        String expectedMessage = "You have been successfully subscribed!";
        String actualMessage = homePage.getSubscriptionSuccessMessage();
        Assert.assertEquals(actualMessage, expectedMessage, "Subscription success message is incorrect or not visible.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
