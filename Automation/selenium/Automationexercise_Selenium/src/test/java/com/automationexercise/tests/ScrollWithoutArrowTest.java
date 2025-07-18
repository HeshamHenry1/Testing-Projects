package com.automationexercise.tests;

import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ScrollWithoutArrowTest {


    WebDriver driver;
    HomePage homePage;


    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );

        // تهيئة الصفحات
        homePage = new HomePage(driver);
    }

    @Test(description = "Test Case 26: Verify Scroll Up without 'Arrow' button")
    public void testScrollUpWithoutArrow() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Scroll down page to bottom
        homePage.scrollToFooter();

        // 5. Verify 'SUBSCRIPTION' is visible
        Assert.assertTrue(homePage.isSubscriptionTextVisible(), "'SUBSCRIPTION' text is not visible at the bottom of the page.");

        // 6. Scroll up page to top
        homePage.scrollToTop();

        // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        // ننتظر قليلاً لظهور النص للتأكد من اكتمال التمرير
        Assert.assertTrue(homePage.isFullFledgedTextVisible(), "Page did not scroll up, or the top text is not visible.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
