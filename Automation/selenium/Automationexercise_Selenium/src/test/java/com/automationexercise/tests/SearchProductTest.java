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

public class SearchProductTest {

    WebDriver driver;
    HomePage homePage;
    ProductsPage productsPage;
    private final String PRODUCT_TO_SEARCH = "Blue Top";

    @BeforeMethod
    public void setup() {
        // 1. Launch browser
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // 2. Navigate to url 'http://automationexercise.com'
        driver.get("http://automationexercise.com" );


        homePage = new HomePage(driver);
        productsPage = new ProductsPage(driver);
    }

    @Test(description = "Test Case 9: Search Product")
    public void testSearchProduct() {
        // 3. Verify that home page is visible successfully
        Assert.assertTrue(driver.getTitle().contains("Automation Exercise"), "Home page is not visible.");

        // 4. Click on 'Products' button
        homePage.clickProductsLink();

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        Assert.assertTrue(driver.getCurrentUrl().contains("/products"), "User is not navigated to the products page.");
        Assert.assertEquals(productsPage.getAllProductsTitle(), "ALL PRODUCTS", "'ALL PRODUCTS' title is not visible.");

        // 6. Enter product name in search input and click search button
        productsPage.searchForProduct(PRODUCT_TO_SEARCH);

        // 7. Verify 'SEARCHED PRODUCTS' is visible

        Assert.assertTrue(productsPage.isSearchedProductsTitleVisible(), "'SEARCHED PRODUCTS' title is not visible.");

        // 8. Verify all the products related to search are visible

        Assert.assertTrue(productsPage.areAllSearchedProductsRelated(PRODUCT_TO_SEARCH),
                "Not all products in the search result are related to the search term '" + PRODUCT_TO_SEARCH + "'.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
