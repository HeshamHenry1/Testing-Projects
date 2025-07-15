package com.automationexercise.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AccountCreatedPage {

    WebDriver driver;

    // Constructor
    public AccountCreatedPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Web Elements
    @FindBy(css = "h2.title.text-center b")
    WebElement accountCreatedText;

    @FindBy(css = ".btn.btn-primary")
    WebElement continueButton;

    // Page Actions
    public String getAccountCreatedText() {
        return accountCreatedText.getText();
    }

    public void clickContinueButton() {
        continueButton.click();
    }
}
