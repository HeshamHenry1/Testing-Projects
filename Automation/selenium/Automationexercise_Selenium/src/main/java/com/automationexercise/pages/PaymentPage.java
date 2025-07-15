package com.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class PaymentPage {
    private WebDriver driver;

    // محددات العناصر
    private By nameOnCardInput = By.name("name_on_card");
    private By cardNumberInput = By.name("card_number");
    private By cvcInput = By.name("cvc");
    private By expiryMonthInput = By.name("expiry_month");
    private By expiryYearInput = By.name("expiry_year");
    private By payAndConfirmButton = By.id("submit");
    private By successMessage = By.xpath("//p[contains(text(), 'Your order has been placed successfully!')]");

    // محددات لزر تحميل الفاتورة وزر المتابعة
    private By downloadInvoiceButton = By.xpath("//a[contains(text(), 'Download Invoice')]");
    private By continueAfterPurchaseButton = By.xpath("//a[text()='Continue']");


    public PaymentPage(WebDriver driver) {
        this.driver = driver;
    }

    public void enterPaymentDetails(String name, String cardNumber, String cvc, String month, String year) {
        driver.findElement(nameOnCardInput).sendKeys(name);
        driver.findElement(cardNumberInput).sendKeys(cardNumber);
        driver.findElement(cvcInput).sendKeys(cvc);
        driver.findElement(expiryMonthInput).sendKeys(month);
        driver.findElement(expiryYearInput).sendKeys(year);
    }

    public void clickPayAndConfirmButton() {
        driver.findElement(payAndConfirmButton).click();
    }

    public String getOrderSuccessMessage() {
        return driver.findElement(successMessage).getText();
    }

    /**
     * تتحقق من أن زر "Download Invoice" موجود وقابل للضغط.
     * @return true إذا كان الزر موجودًا.
     */
    public boolean isDownloadInvoiceButtonVisible() {
        return driver.findElement(downloadInvoiceButton).isDisplayed();
    }

    /**
     * تقوم بالضغط على زر "Download Invoice".
     */
    public void clickDownloadInvoiceButton() {
        driver.findElement(downloadInvoiceButton).click();
    }

    /**
     * تقوم بالضغط على زر "Continue" بعد إتمام عملية الشراء.
     */
    public void clickContinueAfterPurchase() {
        driver.findElement(continueAfterPurchaseButton).click();
    }
}
