package com.automationexercise.pages;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

public class CheckoutPage {

    private WebDriver driver;


    // محددات العناصر
    private By registerLoginButton = By.xpath("//u[text()='Register / Login']");
    private By commentTextArea = By.name("message");
    private By placeOrderButton = By.xpath("//a[text()='Place Order']");
    private By addressDetailsSection = By.id("address_delivery");
    private By reviewOrderSection = By.id("cart_info");

    // محددات لعناوين التوصيل والفوترة
// نستخدم ul#address_delivery و ul#address_invoice للحصول على القائمة بأكملها
    private By deliveryAddressList = By.cssSelector("ul#address_delivery");
    private By billingAddressList = By.cssSelector("ul#address_invoice");

    public CheckoutPage(WebDriver driver) {
        this.driver = driver;
    }

    public void clickRegisterLoginButton() {
        driver.findElement(registerLoginButton).click();
    }

    public boolean isAddressDetailsVisible() {
        return driver.findElement(addressDetailsSection).isDisplayed();
    }

    public boolean isReviewOrderVisible() {
        return driver.findElement(reviewOrderSection).isDisplayed();
    }

    public void enterCommentAndPlaceOrder(String comment) {
        driver.findElement(commentTextArea).sendKeys(comment);
        driver.findElement(placeOrderButton).click();
    }


    /**
     * تقوم بإرجاع قائمة بنصوص كل عنصر في عنوان التوصيل.
     * @return قائمة من النصوص (كل سطر في العنوان هو عنصر في القائمة).
     */
    public List<String> getDeliveryAddressDetails() {
        List<WebElement> addressLines = driver.findElements(By.cssSelector("ul#address_delivery li"));
        List<String> addressDetails = new ArrayList<>();
        for (WebElement line : addressLines) {
            addressDetails.add(line.getText());
        }
        return addressDetails;
    }

    /**
     * تقوم بإرجاع قائمة بنصوص كل عنصر في عنوان الفوترة.
     * @return قائمة من النصوص (كل سطر في العنوان هو عنصر في القائمة).
     */
    public List<String> getBillingAddressDetails() {
        List<WebElement> addressLines = driver.findElements(By.cssSelector("ul#address_invoice li"));
        List<String> addressDetails = new ArrayList<>();
        for (WebElement line : addressLines) {
            addressDetails.add(line.getText());
        }
        return addressDetails;
    }



}
