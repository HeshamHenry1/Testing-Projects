package com.mytests.login;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.openqa.selenium.chrome.ChromeOptions;


public class CartTest {
    private WebDriver driver;
    private CartPage cartPage;
    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-features=PasswordManagerUI");
        driver = new ChromeDriver(options);

        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com/" );

        // Setup is more complex here:
        // 1. Login
        LoginPage loginPage = new LoginPage(driver);
        ProductsPage productsPage = loginPage.login("standard_user", "secret_sauce");

        // 2. Add an item to the cart
        productsPage.addSauceLabsBackpackToCart();

        // 3. Go to the cart page
        cartPage = productsPage.goToShoppingCart();
    }
    @Test
    public void testRemoveItemFromCart() {

        Assert.assertTrue(cartPage.isBackpackDisplayed(), "Pre-condition failed: Backpack was not in the cart initially.");


        // Remove the backpack from the cart
        cartPage.removeBackpack();


        // Verify that the backpack is no longer displayed
        Assert.assertFalse(cartPage.isBackpackDisplayed(), "Backpack was not successfully removed from the cart.");
    }
    @Test
    public void testGoToCheckout() {

        CheckoutPage checkoutPage = cartPage.goToCheckout();


        String expectedTitle = "Checkout: Your Information";
        String actualTitle = checkoutPage.getPageTitle();
        Assert.assertEquals(actualTitle, expectedTitle, "Did not navigate to the checkout page.");
    }


    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
