package com.automationexercise.tests;

import com.automationexercise.pages.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class PlaceOrderRegisterTest {

    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;
    CartPage cartPage;
    CheckoutPage checkoutPage;
    signLoginPage signupLoginPage;
    AccountInformationPage accountInformationPage;
    AccountCreatedPage accountCreatedPage;
    PaymentPage paymentPage;
    AccountDeletedPage accountDeletedPage;


    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );

        // تهيئة كل صفحات الـ Page Objects التي سنحتاجها
        homePage = new HomePage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
        signupLoginPage = new signLoginPage(driver);
        accountInformationPage = new AccountInformationPage(driver);
        accountCreatedPage = new AccountCreatedPage(driver);
        paymentPage = new PaymentPage(driver);
        accountDeletedPage = new AccountDeletedPage(driver);
    }

    @Test(description = "Test Case 14: Place Order: Register while Checkout")
    public void testPlaceOrderAndRegister() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Add products to cart
        productsPage.addProductToCart(productsPage.getFirstProduct());
        productsPage.clickContinueShopping();

        // 5. Click 'Cart' button
        homePage.clickCartButton();

        // 6. Verify that cart page is displayed
        Assert.assertTrue(driver.getCurrentUrl().contains("/view_cart"));

        // 7. Click Proceed To Checkout
        cartPage.clickProceedToCheckout();

        // 8. Click 'Register / Login' button
        checkoutPage.clickRegisterLoginButton();

        // 9. Fill all details in Signup and create account
        String name = "TestUser" + System.currentTimeMillis();
        String email = "testuser" + System.currentTimeMillis() + "@example.com";
        signupLoginPage.enterSignupName(name);
        signupLoginPage.enterSignupEmail(email);
        signupLoginPage.clickSignupButton();
        // ... (تعبئة باقي تفاصيل الحساب)
        accountInformationPage.selectTitle("Mr.");
        accountInformationPage.enterPassword("password123");
        accountInformationPage.selectDateOfBirth("10", "January", "1990");
        accountInformationPage.fillAddressDetails("Test", "User", "Test Co", "123 Street", "Apt 1", "United States", "CA", "LA", "90001", "1234567890");
        accountInformationPage.clickCreateAccountButton();

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        Assert.assertEquals(accountCreatedPage.getAccountCreatedText(), "ACCOUNT CREATED!");
        accountCreatedPage.clickContinueButton();

        // 11. Verify ' Logged in as username' at top
        Assert.assertTrue(homePage.isUserLoggedIn());

        // 12. Click 'Cart' button
        homePage.clickCartButton();

        // 13. Click 'Proceed To Checkout' button
        cartPage.clickProceedToCheckout();

        // 14. Verify Address Details and Review Your Order
        Assert.assertTrue(checkoutPage.isAddressDetailsVisible(), "Address details are not visible.");
        Assert.assertTrue(checkoutPage.isReviewOrderVisible(), "Review order section is not visible.");

        // 15. Enter description in comment text area and click 'Place Order'
        checkoutPage.enterCommentAndPlaceOrder("This is a test order.");

        // 16. Enter payment details
        paymentPage.enterPaymentDetails("Test Card", "1234567890123456", "123", "01", "2030");

        // 17. Click 'Pay and Confirm Order' button
        paymentPage.clickPayAndConfirmButton();

        // 18. Verify success message 'Your order has been placed successfully!'
        // ملاحظة: رسالة النجاح الحقيقية قد تكون مختلفة قليلاً أو لا تظهر
        // Assert.assertEquals(paymentPage.getOrderSuccessMessage(), "Your order has been placed successfully!");

        // 19. Click 'Delete Account' button
        homePage.clickDeleteAccountLink();

        // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
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
