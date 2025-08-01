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

public class AddRecommendedProductTest {


    WebDriver driver;
    HomePage homePage;
    CartPage cartPage;



    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );


        homePage = new HomePage(driver);
        cartPage = new CartPage(driver);
    }


    @Test(description = "Test Case 22: Add to cart from Recommended items")
    public void testAddRecommendedProductToCart() {
        // 3. Scroll to bottom of page
        homePage.scrollToRecommendedItems();

        // 4. Verify 'RECOMMENDED ITEMS' are visible
        Assert.assertTrue(homePage.areRecommendedItemsVisible(), "'RECOMMENDED ITEMS' section is not visible.");

        // 5. Click on 'Add To Cart' on Recommended product
        homePage.addFirstRecommendedProductToCart();

        // 6. Click on 'View Cart' button
        homePage.clickViewCartInModal();

        // 7. Verify that product is displayed in cart page

        Assert.assertEquals(cartPage.getNumberOfProductsInCart(), 1, "Product from recommended items was not added to the cart.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
