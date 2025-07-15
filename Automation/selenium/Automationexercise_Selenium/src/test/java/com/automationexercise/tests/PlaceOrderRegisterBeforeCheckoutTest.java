package com.automationexercise.tests;
import com.automationexercise.pages.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;


public class PlaceOrderRegisterBeforeCheckoutTest {
    WebDriver driver;


    HomePage homePage;
    signLoginPage signupLoginPage;
    AccountInformationPage accountInformationPage;
    AccountCreatedPage accountCreatedPage;
    ProductsPage productsPage;
    CartPage cartPage;
    CheckoutPage checkoutPage;
    PaymentPage paymentPage;
    AccountDeletedPage accountDeletedPage;

    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );

        // تهيئة كل صفحات الـ Page Objects
        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);
        accountInformationPage = new AccountInformationPage(driver);
        accountCreatedPage = new AccountCreatedPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
        paymentPage = new PaymentPage(driver);
        accountDeletedPage = new AccountDeletedPage(driver);
    }

    @Test(description = "Test Case 15: Place Order: Register before Checkout")
    public void testRegisterBeforeCheckout() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Click 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Fill all details in Signup and create account
        String name = "TestUser" + System.currentTimeMillis();
        String email = "testuser" + System.currentTimeMillis() + "@example.com";
        signupLoginPage.enterSignupName(name);
        signupLoginPage.enterSignupEmail(email);
        signupLoginPage.clickSignupButton();
        // تعبئة باقي تفاصيل الحساب
        accountInformationPage.selectTitle("Mr.");
        accountInformationPage.enterPassword("password123");
        accountInformationPage.selectDateOfBirth("15", "July", "1995");
        accountInformationPage.fillAddressDetails("Test", "User", "Test Corp", "456 Avenue", "Suite 2", "Canada", "Ontario", "Toronto", "M5H 2N2", "9876543210");
        accountInformationPage.clickCreateAccountButton();

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        Assert.assertEquals(accountCreatedPage.getAccountCreatedText(), "ACCOUNT CREATED!");
        accountCreatedPage.clickContinueButton();

        // 7. Verify ' Logged in as username' at top
        Assert.assertTrue(homePage.isUserLoggedIn());

        // 8. Add products to cart
        homePage.clickProductsLink(); // ننتقل إلى صفحة المنتجات أولاً
        productsPage.addProductToCart(productsPage.getFirstProduct());
        productsPage.clickContinueShopping();

        // 9. Click 'Cart' button
        homePage.clickCartButton();

        // 10. Verify that cart page is displayed
        Assert.assertTrue(driver.getCurrentUrl().contains("/view_cart"));

        // 11. Click Proceed To Checkout
        cartPage.clickProceedToCheckout();

        // 12. Verify Address Details and Review Your Order
        Assert.assertTrue(checkoutPage.isAddressDetailsVisible(), "Address details are not visible.");
        Assert.assertTrue(checkoutPage.isReviewOrderVisible(), "Review order section is not visible.");

        // 13. Enter description in comment text area and click 'Place Order'
        checkoutPage.enterCommentAndPlaceOrder("This is another test order.");

        // 14. Enter payment details
        paymentPage.enterPaymentDetails("Test Card Holder", "9876543210987654", "321", "05", "2028");

        // 15. Click 'Pay and Confirm Order' button
        paymentPage.clickPayAndConfirmButton();

        // 16. Verify success message 'Your order has been placed successfully!'
        // Assert.assertEquals(paymentPage.getOrderSuccessMessage(), "Your order has been placed successfully!");

        // 17. Click 'Delete Account' button
        homePage.clickDeleteAccountLink();

        // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
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
