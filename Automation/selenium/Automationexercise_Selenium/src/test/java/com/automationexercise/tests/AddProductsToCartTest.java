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

import java.util.List;
import java.util.Map;

public class AddProductsToCartTest {

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

    @Test(description = "Test Case 12: Add Products in Cart")
    public void testAddProductsToCart() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Click 'Products' button
        homePage.clickProductsLink();

        // 5. Hover over first product and click 'Add to cart'
        productsPage.addProductToCart(productsPage.getFirstProduct());

        // 6. Click 'Continue Shopping' button
        productsPage.clickContinueShopping();

        // 7. Hover over second product and click 'Add to cart'
        productsPage.addProductToCart(productsPage.getSecondProduct());

        // 8. Click 'View Cart' button
        productsPage.clickViewCart();

        // 9. Verify both products are added to Cart
        Assert.assertEquals(cartPage.getNumberOfProductsInCart(), 2, "The number of products in the cart is not 2.");

        // 10. Verify their prices, quantity and total price
        List<Map<String, String>> productsInCart = cartPage.getProductsDetailsInCart();

        // التحقق من المنتج الأول
        Map<String, String> firstProductDetails = productsInCart.get(0);
        Assert.assertEquals(firstProductDetails.get("name"), "Blue Top");
        Assert.assertEquals(firstProductDetails.get("price"), "Rs. 500");
        Assert.assertEquals(firstProductDetails.get("quantity"), "1");
        Assert.assertEquals(firstProductDetails.get("total"), "Rs. 500");

        // التحقق من المنتج الثاني
        Map<String, String> secondProductDetails = productsInCart.get(1);
        Assert.assertEquals(secondProductDetails.get("name"), "Men Tshirt");
        Assert.assertEquals(secondProductDetails.get("price"), "Rs. 400");
        Assert.assertEquals(secondProductDetails.get("quantity"), "1");
        Assert.assertEquals(secondProductDetails.get("total"), "Rs. 400");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
