package com.automationexercise.tests;


import com.automationexercise.pages.HomePage;
import com.automationexercise.pages.ProductsPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class AddReviewTest {

    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;



    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );

        // تهيئة الصفحات
        homePage = new HomePage(driver);
        productsPage = new ProductsPage(driver);
    }

    @Test(description = "Test Case 21: Add review on product")
    public void testAddReviewOnProduct() {
        // 3. Click on 'Products' button
        homePage.clickProductsLink();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"), "User is not on the All Products page.");

        // 5. Click on 'View Product' button for the first product
        productsPage.clickFirstProductViewLink();

        // 6. Verify 'Write Your Review' is visible
        Assert.assertTrue(productsPage.isWriteYourReviewVisible(), "'Write Your Review' section is not visible.");

        // 7. Enter name, email and review
        String name = "Test Reviewer";
        String email = "reviewer." + System.currentTimeMillis() + "@example.com";
        String review = "This is a great product! Highly recommended.";
        productsPage.submitReview(name, email, review);

        // 8. Click 'Submit' button (تمت في الخطوة السابقة)

        // 9. Verify success message 'Thank you for your review.'
        String expectedMessage = "Thank you for your review.";
        String actualMessage = productsPage.getReviewSuccessMessage();
        Assert.assertEquals(actualMessage, expectedMessage, "Review submission success message is incorrect or not visible.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
