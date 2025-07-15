package com.automationexercise.tests;
import com.automationexercise.pages.HomePage;
import com.automationexercise.pages.ProductsPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;


public class ProductsTest {

    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;


    @BeforeMethod
    public void setup() {
        // 1. Launch browser
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // 2. Navigate to url 'http://automationexercise.com'
        driver.get("http://automationexercise.com" );

        // تهيئة صفحات الـ Page Objects
        homePage = new HomePage(driver);
        productsPage = new ProductsPage(driver);
    }

    @Test(description = "Test Case 8: Verify All Products and product detail page")
    public void verifyAllProductsAndDetailPage() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Click on 'Products' button
        homePage.clickProductsLink();

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        String expectedUrl = "https://automationexercise.com/products";
        Assert.assertEquals(driver.getCurrentUrl( ), expectedUrl, "User is not navigated to the products page.");
        Assert.assertEquals(productsPage.getAllProductsTitle(), "ALL PRODUCTS", "'ALL PRODUCTS' title is not visible.");

        // 6. The products list is visible
        Assert.assertTrue(productsPage.areProductsVisible(), "Products list is not visible.");

        // 7. Click on 'View Product' of first product
        productsPage.clickFirstProductViewLink();

        // 8. User is landed to product detail page
        // نتحقق من أن الرابط يحتوي على تفاصيل منتج (مثلاً /product_details/1)
        Assert.assertTrue(driver.getCurrentUrl().contains("/product_details/"), "User is not on a product detail page.");

        // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
        Assert.assertTrue(productsPage.areProductDetailsVisible(), "One or more product details are not visible on the detail page.");
        // to show
        productsPage.printProductDetails();
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
