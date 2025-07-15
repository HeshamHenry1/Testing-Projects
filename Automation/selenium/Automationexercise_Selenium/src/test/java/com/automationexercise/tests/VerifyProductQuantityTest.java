package com.automationexercise.tests;

import com.automationexercise.pages.CartPage;
import com.automationexercise.pages.HomePage;
import com.automationexercise.pages.ProductsPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class VerifyProductQuantityTest {

    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;
    CartPage cartPage;


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
        cartPage = new CartPage(driver);
    }

    @Test(description = "Test Case 13: Verify Product quantity in Cart")
    public void testVerifyProductQuantityInCart() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Click 'View Product' for any product on home page
        // سنستخدم أول منتج كمثال
        productsPage.clickFirstProductViewLink();

        // 5. Verify product detail is opened
        Assert.assertTrue(driver.getCurrentUrl().contains("/product_details/"), "Product detail page is not opened.");
        Assert.assertTrue(productsPage.areProductDetailsVisible(), "Product details are not visible.");

        // 6. Increase quantity to 4
        String desiredQuantity = "4";
        productsPage.setProductQuantity(desiredQuantity);

        // 7. Click 'Add to cart' button
        productsPage.clickAddToCartOnDetailPage();

        // 8. Click 'View Cart' button
        productsPage.clickViewCart();

        // 9. Verify that product is displayed in cart page with exact quantity
        Assert.assertEquals(cartPage.getFirstProductQuantity(), desiredQuantity, "The product quantity in the cart is incorrect.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

}
