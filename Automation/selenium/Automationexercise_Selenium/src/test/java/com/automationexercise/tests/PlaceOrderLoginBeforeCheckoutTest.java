package com.automationexercise.tests;
import com.automationexercise.pages.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class PlaceOrderLoginBeforeCheckoutTest {
    WebDriver driver;

    HomePage homePage;
    signLoginPage signupLoginPage;
    ProductsPage productsPage;
    CartPage cartPage;
    CheckoutPage checkoutPage;
    PaymentPage paymentPage;
    AccountDeletedPage accountDeletedPage;

    private final String TEST_USERNAME = "login_user_" + System.currentTimeMillis();
    private final String TEST_EMAIL = "login_user_" + System.currentTimeMillis() + "@example.com";
    private final String TEST_PASSWORD = "password123";


    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );


        homePage = new HomePage(driver);
        signupLoginPage = new signLoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
        paymentPage = new PaymentPage(driver);
        accountDeletedPage = new AccountDeletedPage(driver);


        homePage.clickSignupLoginLink();

        signupLoginPage.signupAndCreateAccount(
                TEST_USERNAME,
                TEST_EMAIL,
                "Mr.",
                TEST_PASSWORD,
                "10", "March", "1990",
                "Test", "User", "Test Inc.", "123 Main St", "Apt 4B", "United States", "Texas", "Dallas", "75201", "5551234567"
        );
    }
    @Test(description = "Test Case 16: Place Order: Login before Checkout")
    public void testLoginBeforeCheckout() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Click 'Signup / Login' button
        homePage.clickSignupLoginLink();

        // 5. Fill email, password and click 'Login' button
        signupLoginPage.login(TEST_EMAIL, TEST_PASSWORD);

        // 6. Verify 'Logged in as username' at top
        Assert.assertTrue(homePage.isUserLoggedIn());

        // 7. Add products to cart
        homePage.clickProductsLink();
        productsPage.addProductToCart(productsPage.getFirstProduct());
        productsPage.clickContinueShopping();

        // 8. Click 'Cart' button
        homePage.clickCartButton();

        // 9. Verify that cart page is displayed
        Assert.assertTrue(driver.getCurrentUrl().contains("/view_cart"));

        // 10. Click Proceed To Checkout
        cartPage.clickProceedToCheckout();

        // 11. Verify Address Details and Review Your Order
        Assert.assertTrue(checkoutPage.isAddressDetailsVisible());
        Assert.assertTrue(checkoutPage.isReviewOrderVisible());

        // 12. Enter description in comment text area and click 'Place Order'
        checkoutPage.enterCommentAndPlaceOrder("Order for existing user.");

        // 13. Enter payment details
        paymentPage.enterPaymentDetails("Test User Card", "1111222233334444", "111", "12", "2025");

        // 14. Click 'Pay and Confirm Order' button
        paymentPage.clickPayAndConfirmButton();

        // 15. Verify success message 'Your order has been placed successfully!'
        // Assert.assertEquals(paymentPage.getOrderSuccessMessage(), "Your order has been placed successfully!");
    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            try {
                homePage.clickDeleteAccountLink();
                Assert.assertEquals(accountDeletedPage.getAccountDeletedText(), "ACCOUNT DELETED!");
                accountDeletedPage.clickContinueButton();
            } catch (Exception e) {
                System.out.println("Could not clean up and delete user account. Reason: " + e.getMessage());
            } finally {
                driver.quit();
            }
        }
    }

}
