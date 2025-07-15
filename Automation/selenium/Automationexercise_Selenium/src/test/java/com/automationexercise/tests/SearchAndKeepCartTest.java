package com.automationexercise.tests;

import com.automationexercise.pages.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.List;

public class SearchAndKeepCartTest {
    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;
    CartPage cartPage;
    signLoginPage signupLoginPage;



    private final String REGISTERED_EMAIL = "testuser1752483079184@example.com";
    private final String REGISTERED_PASSWORD = "password123";
    private final String PRODUCT_TO_SEARCH = "Blue Top";


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
        signupLoginPage = new signLoginPage(driver);
    }


    @Test(description = "Test Case 20: Search Products and Verify Cart After Login")
    public void testSearchAndVerifyCartAfterLogin() {
        // 3. Click on 'Products' button
        homePage.clickProductsLink();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"));

        // 5. Enter product name in search input and click search button
        productsPage.searchForProduct(PRODUCT_TO_SEARCH);

        // 6. Verify 'SEARCHED PRODUCTS' is visible
        Assert.assertTrue(productsPage.isSearchedProductsTitleVisible());

        // 7. Verify all the products related to search are visible
        Assert.assertTrue(productsPage.areBrandProductsDisplayed()); // 'areBrandProductsDisplayed' تعمل هنا أيضًا

        // 8. Add those products to cart
        List<String> addedProducts = productsPage.addAllDisplayedProductsToCart();
        Assert.assertFalse(addedProducts.isEmpty(), "No products were added to the cart.");

        // 9. Click 'Cart' button and verify that products are visible in cart
        homePage.clickCartButton();
        Assert.assertTrue(cartPage.areProductsPresentInCart(addedProducts), "Products are not visible in cart before login.");

        // 10. Click 'Signup / Login' button and submit login details
        homePage.clickSignupLoginLink();
        signupLoginPage.login(REGISTERED_EMAIL, REGISTERED_PASSWORD);

        // 11. Again, go to Cart page
        homePage.clickCartButton();

        // 12. Verify that those products are visible in cart after login as well
        Assert.assertTrue(cartPage.areProductsPresentInCart(addedProducts), "Cart content did not persist after login.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

}
