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

public class RemoveProductFromCartTest {

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



    @Test(description = "Test Case 17: Remove Products From Cart")
    public void testRemoveProductFromCart() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"));

        // 4. Add products to cart
        homePage.clickProductsLink();
        productsPage.addProductToCart(productsPage.getFirstProduct());
        productsPage.clickViewCart(); // ننتقل مباشرة إلى السلة بعد الإضافة

        // 5. Click 'Cart' button (تم تنفيذها ضمنيًا في الخطوة السابقة)
        // 6. Verify that cart page is displayed
        Assert.assertTrue(driver.getCurrentUrl().contains("/view_cart"), "Cart page is not displayed.");
        // نتأكد أن السلة ليست فارغة قبل الحذف
        Assert.assertEquals(cartPage.getNumberOfProductsInCart(), 1, "Product was not added to cart correctly.");

        // 7. Click 'X' button corresponding to particular product
        cartPage.clickDeleteButtonForFirstProduct();

        // 8. Verify that product is removed from the cart
        // أفضل طريقة للتحقق هي التأكد من ظهور رسالة "Cart is empty!"
        Assert.assertTrue(cartPage.isCartEmpty(), "Product was not removed from the cart, or 'Cart is empty!' message is not visible.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
