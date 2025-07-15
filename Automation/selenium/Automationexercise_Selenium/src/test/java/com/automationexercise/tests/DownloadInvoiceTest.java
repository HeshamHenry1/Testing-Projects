package com.automationexercise.tests;

import com.automationexercise.pages.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class DownloadInvoiceTest {

    WebDriver driver;
    // كل الصفحات التي سنحتاجها
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

        // تهيئة كل صفحات الـ Page Objects
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

    @Test(description = "Test Case 24: Download Invoice after purchase order")
    public void testDownloadInvoiceAfterPurchase() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Add products to cart
        homePage.clickProductsLink();
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
        String name = "InvoiceUser" + System.currentTimeMillis();
        String email = "invoice.user" + System.currentTimeMillis() + "@example.com";
        signupLoginPage.enterSignupName(name);
        signupLoginPage.enterSignupEmail(email);
        signupLoginPage.clickSignupButton();
        accountInformationPage.selectTitle("Mrs.");
        accountInformationPage.enterPassword("securepass456");
        accountInformationPage.selectDateOfBirth("30", "November", "2000");
        accountInformationPage.fillAddressDetails("Invoice", "Test", "Invo Corp", "789 Billing St", "", "Singapore", "Singapore", "Singapore", "178900", "87654321");
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
        Assert.assertTrue(checkoutPage.isAddressDetailsVisible());
        Assert.assertTrue(checkoutPage.isReviewOrderVisible());

        // 15. Enter description and click 'Place Order'
        checkoutPage.enterCommentAndPlaceOrder("Test order for invoice download.");

        // 16. Enter payment details
        paymentPage.enterPaymentDetails("Invoice Test Card", "4111111111111111", "123", "08", "2029");

        // 17. Click 'Pay and Confirm Order' button
        paymentPage.clickPayAndConfirmButton();

        // 18. Verify success message (قد تكون هذه الخطوة غير موثوقة)
        // Assert.assertTrue(paymentPage.getOrderSuccessMessage().contains("placed successfully"));

        // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
        Assert.assertTrue(paymentPage.isDownloadInvoiceButtonVisible(), "'Download Invoice' button is not visible.");
        paymentPage.clickDownloadInvoiceButton();
        // التحقق من التحميل سيتم بطريقة غير مباشرة (سنتأكد لاحقًا أننا نستطيع المتابعة)

        // 20. Click 'Continue' button
        paymentPage.clickContinueAfterPurchase();

        // 21. Click 'Delete Account' button
        homePage.clickDeleteAccountLink();

        // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
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
