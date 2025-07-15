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

public class ViewBrandProductsTest {

    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;




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
    }



    @Test(description = "Test Case 19: View & Cart Brand Products")
    public void testViewBrandProducts() {
        // 3. Click on 'Products' button
        homePage.clickProductsLink();

        // 4. Verify that Brands are visible on left side bar
        Assert.assertTrue(productsPage.areBrandsVisible(), "Brands sidebar is not visible.");

        // 5. Click on any brand name (e.g., Polo)
        productsPage.clickPoloBrandLink();

        // 6. Verify that user is navigated to brand page and brand products are displayed
        String expectedPoloTitle = "BRAND - POLO PRODUCTS";
        Assert.assertEquals(productsPage.getBrandPageTitleText(), expectedPoloTitle, "Polo brand page title is incorrect.");
        Assert.assertTrue(productsPage.areBrandProductsDisplayed(), "Products for Polo brand are not displayed.");

        // 7. On left side bar, click on any other brand link (e.g., H&M)
        productsPage.clickHAndMBrandLink();

        // 8. Verify that user is navigated to that brand page and can see products
        String expectedHAndMTitle = "BRAND - H&M PRODUCTS";
        Assert.assertEquals(productsPage.getBrandPageTitleText(), expectedHAndMTitle, "H&M brand page title is incorrect.");
        Assert.assertTrue(productsPage.areBrandProductsDisplayed(), "Products for H&M brand are not displayed.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
