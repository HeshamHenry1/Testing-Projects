package com.automationexercise.tests;

import com.automationexercise.pages.CartPage;
import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class SubscriptionInCartTest {

    WebDriver driver;
    HomePage homePage;
    CartPage cartPage;

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
        cartPage = new CartPage(driver);
    }

    @Test(description = "Test Case 11: Verify Subscription in Cart page")
    public void testCartPageSubscription() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Click 'Cart' button
        homePage.clickCartButton();

        // 5. Scroll down to footer
        cartPage.scrollToFooter();

        // 6. Verify text 'SUBSCRIPTION'
        Assert.assertTrue(cartPage.isSubscriptionTitleVisible(), "'SUBSCRIPTION' title is not visible in the footer.");

        // 7. Enter email address in input and click arrow button
        String emailToSubscribe = "test.cart.subscribe." + System.currentTimeMillis() + "@example.com";
        cartPage.subscribeWithEmail(emailToSubscribe);

        // 8. Verify success message 'You have been successfully subscribed!' is visible
        String expectedMessage = "You have been successfully subscribed!";
        String actualMessage = cartPage.getSubscriptionSuccessMessage();
        Assert.assertEquals(actualMessage, expectedMessage, "Subscription success message is incorrect or not visible.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

