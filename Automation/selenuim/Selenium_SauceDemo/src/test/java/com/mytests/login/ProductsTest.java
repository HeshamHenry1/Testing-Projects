package com.mytests.login;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.openqa.selenium.chrome.ChromeOptions;



public class ProductsTest {
    private WebDriver driver;
    private LoginPage loginPage;
    private ProductsPage productsPage;
    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-features=PasswordManagerUI");
        driver = new ChromeDriver(options);

        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com/" );
        // للوصول إلى صفحة المنتجات، يجب أن نسجل الدخول أولاً
        loginPage = new LoginPage(driver);
        // نقوم بتسجيل الدخول وتخزين الصفحة الناتجة (ProductsPage) في المتغير
        productsPage = loginPage.login("standard_user", "secret_sauce");
    }
    @Test
    public void printNumberOfProducts() {
        // الخطوة 1: احصل على العدد الفعلي للمنتجات من الصفحة
        int actualNumberOfProducts = productsPage.getNumberOfProducts();

        // الخطوة 2: اطبع العدد على الشاشة
        System.out.println("The current number of products on the page is: " + actualNumberOfProducts);
    }
    @Test
    public void testAddBackpackToCart() {
        // الخطوة 1: أضف حقيبة الظهر إلى عربة التسوق
        productsPage.addSauceLabsBackpackToCart();

        // --- التحقق الأول: تأكد من أن نص الزر تغير إلى "Remove" ---
        String expectedButtonText = "Remove";
        String actualButtonText = productsPage.getSauceLabsBackpackButtonText();
        Assert.assertEquals(actualButtonText, expectedButtonText, "The button text did not change to 'Remove'.");

        // --- التحقق الثاني: تأكد من أن أيقونة العربة تظهر الرقم "1" ---
        String expectedCartBadgeValue = "1";
        String actualCartBadgeValue = productsPage.getShoppingCartBadgeValue();
        Assert.assertEquals(actualCartBadgeValue, expectedCartBadgeValue, "The shopping cart badge was not updated.");
    }
    @Test
    public void testRemoveBackpackFromCart() {

        // الخطوة 1: أضف المنتج إلى السلة أولاً
        productsPage.addSauceLabsBackpackToCart();

        // الخطوة 2 (اختياري لكن جيد): تحقق سريع من أن الإضافة تمت بنجاح
        Assert.assertEquals(productsPage.getShoppingCartBadgeValue(), "1", "Setup failed: Item was not added to cart.");


        // الخطوة 3: انقر على زر "Remove" (هو نفس الزر، فقط نصه تغير)

        productsPage.addSauceLabsBackpackToCart();


        // الخطوة 4: تحقق من أن نص الزر عاد إلى "Add to cart"
        String expectedButtonText = "Add to cart";
        String actualButtonText = productsPage.getSauceLabsBackpackButtonText();
        Assert.assertEquals(actualButtonText, expectedButtonText, "The button text did not change back to 'Add to cart'.");

        // الخطوة 5: تحقق من أن شارة عربة التسوق قد اختفت
        Assert.assertTrue(productsPage.isCartBadgeNotDisplayed(), "The shopping cart badge was not removed.");
    }
    @Test
    public void testNavigationToCartAndVerifyItem() {

        // الخطوة 1: أضف المنتج إلى السلة
        productsPage.addSauceLabsBackpackToCart();


        // الخطوة 2: انتقل إلى صفحة عربة التسوق

        CartPage cartPage = productsPage.goToShoppingCart();


        // الخطوة 3: تحقق من أن حقيبة الظهر موجودة في صفحة السلة

        Assert.assertTrue(cartPage.isBackpackDisplayed(), "The backpack is not displayed in the cart.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
