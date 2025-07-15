package com.automationexercise.tests;

import com.automationexercise.pages.HomePage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class HomePageTest {

    WebDriver driver;
    HomePage homePage;

    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com" );
        homePage = new HomePage(driver);
    }

    @Test
    public void verifyHomePageTitle() {
        String expectedTitle = "Automation Exercise";
        String actualTitle = homePage.getHomePageTitle();
        Assert.assertEquals(actualTitle, expectedTitle, "Home page title does not match");
    }

    @Test
    public void verifyHomePageUrl() {
        String expectedUrl = "https://automationexercise.com/";
        String actualUrl = homePage.getHomePageUrl( );
        Assert.assertEquals(actualUrl, expectedUrl, "Home page URL does not match");
    }

    @Test
    public void navigateToProductsPage() {
        homePage.clickProductsLink();
        // Add assertion to verify navigation to products page
       Assert.assertTrue(driver.getCurrentUrl().contains("products"));
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
