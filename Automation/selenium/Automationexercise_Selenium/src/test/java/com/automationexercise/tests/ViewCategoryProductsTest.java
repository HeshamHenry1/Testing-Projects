package com.automationexercise.tests;
import com.automationexercise.pages.CategoryPage;
import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ViewCategoryProductsTest {

    WebDriver driver;
    HomePage homePage;
    CategoryPage categoryPage;


    @BeforeMethod
    public void setup() {
        // 1. Launch browser & 2. Navigate to url
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );

        // تهيئة الصفحات
        homePage = new HomePage(driver);
        categoryPage = new CategoryPage(driver);
    }


    @Test(description = "Test Case 18: View Category Products")
    public void testViewCategoryProducts() {
        // 3. Verify that categories are visible on left side bar
        Assert.assertTrue(homePage.areCategoriesVisible(), "Categories sidebar is not visible.");

        // 4. Click on 'Women' category
        homePage.clickWomenCategory();

        // 5. Click on any category link under 'Women' category, for example: Dress
        homePage.clickWomenDressSubCategory();

        // 6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
        // ملاحظة: النص الفعلي هو 'WOMEN - DRESS PRODUCTS' وليس 'TOPS'
        String expectedWomenCategoryTitle = "WOMEN - DRESS PRODUCTS";
        Assert.assertEquals(categoryPage.getCategoryTitleText(), expectedWomenCategoryTitle, "Women category page title is incorrect.");
        Assert.assertTrue(driver.getCurrentUrl().contains("category_products/1"), "URL for Women's Dress category is incorrect.");

        // 7. On left side bar, click on any sub-category link of 'Men' category
        homePage.clickMenCategory();
        homePage.clickMenTshirtsSubCategory();

        // 8. Verify that user is navigated to that category page
        String expectedMenCategoryTitle = "MEN - TSHIRTS PRODUCTS";
        Assert.assertEquals(categoryPage.getCategoryTitleText(), expectedMenCategoryTitle, "Men category page title is incorrect.");
        Assert.assertTrue(driver.getCurrentUrl().contains("category_products/3"), "URL for Men's Tshirts category is incorrect.");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
