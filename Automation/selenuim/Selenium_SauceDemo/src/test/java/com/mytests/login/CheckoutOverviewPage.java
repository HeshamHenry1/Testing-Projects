package com.mytests.login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CheckoutOverviewPage {

    private WebDriver driver;
    private WebDriverWait wait;

    // Locator for the page title
    private By pageTitle = By.className("title");

    public CheckoutOverviewPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the title of the Overview Page ("Checkout: Overview") is visible
        wait.until(ExpectedConditions.visibilityOfElementLocated(pageTitle));
    }

    /**
     * Gets the title of the overview page.
     * @return The text of the page title.
     */
    public String getPageTitle() {
        return driver.findElement(pageTitle).getText();
    }
}
