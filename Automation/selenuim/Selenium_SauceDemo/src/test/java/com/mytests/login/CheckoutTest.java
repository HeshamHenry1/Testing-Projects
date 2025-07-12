package com.mytests.login;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.openqa.selenium.chrome.ChromeOptions;


public class CheckoutTest {

    private WebDriver driver;
    private CheckoutPage checkoutPage;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-features=PasswordManagerUI");
        driver = new ChromeDriver(options);

        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com/" );

        // --- Setup Journey ---
        // 1. Login
        LoginPage loginPage = new LoginPage(driver);
        ProductsPage productsPage = loginPage.login("standard_user", "secret_sauce");
        // 2. Add item to cart
        productsPage.addSauceLabsBackpackToCart();
        // 3. Go to cart
        CartPage cartPage = productsPage.goToShoppingCart();
        // 4. Go to checkout
        checkoutPage = cartPage.goToCheckout();
    }

    @Test
    public void testFillUserDetailsAndContinue() {

        CheckoutOverviewPage overviewPage = checkoutPage.fillUserDetailsAndContinue("Hesham", "Henry", "12345");

        String expectedTitle = "Checkout: Overview";
        String actualTitle = overviewPage.getPageTitle();
        Assert.assertEquals(actualTitle, expectedTitle, "Did not navigate to the checkout overview page.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
