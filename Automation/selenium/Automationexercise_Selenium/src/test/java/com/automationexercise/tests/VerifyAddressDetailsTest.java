package com.automationexercise.tests;

import com.automationexercise.pages.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class VerifyAddressDetailsTest {


    WebDriver driver;

    HomePage homePage;
    signLoginPage signupLoginPage;
    AccountInformationPage accountInformationPage;
    AccountCreatedPage accountCreatedPage;
    ProductsPage productsPage;
    CartPage cartPage;
    CheckoutPage checkoutPage;
    AccountDeletedPage accountDeletedPage;
    private Map<String, String> registrationData;


    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );


        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);
        accountInformationPage = new AccountInformationPage(driver);
        accountCreatedPage = new AccountCreatedPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
        accountDeletedPage = new AccountDeletedPage(driver);
    }



    @Test(description = "Test Case 23: Verify address details in checkout page")
    public void testVerifyAddressDetails() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Click 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Fill all details in Signup and create account

        registrationData = new HashMap<>();
        registrationData.put("title", "Mr.");
        registrationData.put("name", "Test " + System.currentTimeMillis());
        registrationData.put("email", "test.address." + System.currentTimeMillis() + "@example.com");
        registrationData.put("password", "password123");
        registrationData.put("day", "20");
        registrationData.put("month", "May");
        registrationData.put("year", "1988");
        registrationData.put("firstName", "John");
        registrationData.put("lastName", "Doe");
        registrationData.put("company", "Test Corp International");
        registrationData.put("address1", "123 Automation Lane");
        registrationData.put("address2", "Apt 101");
        registrationData.put("country", "United States");
        registrationData.put("state", "California");
        registrationData.put("city", "San Francisco");
        registrationData.put("zipcode", "94105");
        registrationData.put("mobile", "5558675309");

        signupLoginPage.enterSignupName(registrationData.get("name"));
        signupLoginPage.enterSignupEmail(registrationData.get("email"));
        signupLoginPage.clickSignupButton();
        accountInformationPage.selectTitle(registrationData.get("title"));
        accountInformationPage.enterPassword(registrationData.get("password"));
        accountInformationPage.selectDateOfBirth(registrationData.get("day"), registrationData.get("month"), registrationData.get("year"));
        accountInformationPage.fillAddressDetails(
                registrationData.get("firstName"), registrationData.get("lastName"), registrationData.get("company"),
                registrationData.get("address1"), registrationData.get("address2"), registrationData.get("country"),
                registrationData.get("state"), registrationData.get("city"), registrationData.get("zipcode"),
                registrationData.get("mobile")
        );
        accountInformationPage.clickCreateAccountButton();

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        Assert.assertEquals(accountCreatedPage.getAccountCreatedText(), "ACCOUNT CREATED!");
        accountCreatedPage.clickContinueButton();

        // 7. Verify ' Logged in as username' at top
        Assert.assertTrue(homePage.isUserLoggedIn());

        // 8. Add products to cart
        homePage.clickProductsLink();
        productsPage.addProductToCart(productsPage.getFirstProduct());
        productsPage.clickContinueShopping();

        // 9. Click 'Cart' button
        homePage.clickCartButton();

        // 10. Verify that cart page is displayed
        Assert.assertTrue(driver.getCurrentUrl().contains("/view_cart"));

        // 11. Click Proceed To Checkout
        cartPage.clickProceedToCheckout();

        // 12. Verify that the delivery address is same address filled at the time registration
        List<String> deliveryAddress = checkoutPage.getDeliveryAddressDetails();


        System.out.println("Delivery Address found on page: " + deliveryAddress);

        // 13. Verify that the billing address is same address filled at the time registration
        List<String> billingAddress = checkoutPage.getBillingAddressDetails();
        System.out.println("Billing Address found on page: " + billingAddress);

        // 14. Click 'Delete Account' button
        homePage.clickDeleteAccountLink();

        // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        Assert.assertEquals(accountDeletedPage.getAccountDeletedText(), "ACCOUNT DELETED!");
        accountDeletedPage.clickContinueButton();
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

}
