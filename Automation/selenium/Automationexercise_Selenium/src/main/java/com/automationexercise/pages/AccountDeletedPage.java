package com.automationexercise.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AccountDeletedPage {

    WebDriver driver;

    public AccountDeletedPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    @FindBy(css = "h2.title.text-center b")
    WebElement accountDeletedText;

    @FindBy(css = ".btn.btn-primary")
    WebElement continueButton;

    public String getAccountDeletedText() {
        return accountDeletedText.getText();
    }

    public void clickContinueButton() {
        continueButton.click();
    }
}
