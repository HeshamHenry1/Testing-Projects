package com.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CartPage {
    private WebDriver driver;


    private By subscriptionTitle = By.xpath("//h2[text()='Subscription']");
    private By subscriptionEmailInput = By.id("susbscribe_email");
    private By subscriptionArrowButton = By.id("subscribe");
    private By successMessageAlert = By.id("success-subscribe");


    private By cartRows = By.cssSelector("tbody tr");
    private By productName = By.cssSelector("td.cart_description h4 a");
    private By productPrice = By.cssSelector("td.cart_price p");
    private By productQuantity = By.cssSelector("td.cart_quantity button");
    private By productTotalPrice = By.cssSelector("td.cart_total p");

    // proceedToCheckoutButton

    private By proceedToCheckoutButton = By.xpath("//a[text()='Proceed To Checkout']");



    private By deleteButton = By.cssSelector("td.cart_delete a.cart_quantity_delete");


    private By cartEmptyMessage = By.xpath("//b[text()='Cart is empty!']");

    public CartPage(WebDriver driver) {
        this.driver = driver;
    }


    public void scrollToFooter() {
        ((JavascriptExecutor) driver).executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    public boolean isSubscriptionTitleVisible() {
        return driver.findElement(subscriptionTitle).isDisplayed();
    }

    public void subscribeWithEmail(String email) {
        driver.findElement(subscriptionEmailInput).sendKeys(email);
        driver.findElement(subscriptionArrowButton).click();
    }

    public String getSubscriptionSuccessMessage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement successMessageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(successMessageAlert));
        return successMessageElement.getText();
    }



    public int getNumberOfProductsInCart() {
        return driver.findElements(cartRows).size();
    }


    public List<Map<String, String>> getProductsDetailsInCart() {
        List<Map<String, String>> products = new ArrayList<>();
        List<WebElement> rows = driver.findElements(cartRows);

        for (WebElement row : rows) {
            Map<String, String> productDetails = new HashMap<>();
            productDetails.put("name", row.findElement(productName).getText());
            productDetails.put("price", row.findElement(productPrice).getText());
            productDetails.put("quantity", row.findElement(productQuantity).getText());
            productDetails.put("total", row.findElement(productTotalPrice).getText());
            products.add(productDetails);
        }
        return products;
    }

    public String getFirstProductQuantity() {

        WebElement firstRow = driver.findElement(cartRows);
        return firstRow.findElement(productQuantity).getText();
    }

    public void clickProceedToCheckout() {
        driver.findElement(proceedToCheckoutButton).click();
    }



    public void clickDeleteButtonForFirstProduct() {
        driver.findElement(deleteButton).click();
    }


    public boolean isCartEmpty() {
        try {

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
            return wait.until(ExpectedConditions.visibilityOfElementLocated(cartEmptyMessage)).isDisplayed();
        } catch (Exception e) {

            return false;
        }
    }


    public boolean areProductsPresentInCart(List<String> expectedProductNames) {
        List<Map<String, String>> productsInCart = getProductsDetailsInCart();

        List<String> actualProductNames = new ArrayList<>();
        for (Map<String, String> product : productsInCart) {
            actualProductNames.add(product.get("name"));
        }


        return actualProductNames.containsAll(expectedProductNames);
    }
}
