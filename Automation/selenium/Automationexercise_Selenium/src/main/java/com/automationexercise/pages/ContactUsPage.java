package com.automationexercise.pages;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;


public class ContactUsPage {
    private WebDriver driver;
    public ContactUsPage(WebDriver driver) {
        this.driver = driver;
    }


    // Web Elements
    private By getInTouchTitle = By.xpath("//h2[text()='Get In Touch']");
    private By nameInput = By.name("name");
    private By emailInput = By.name("email");
    private By subjectInput = By.name("subject");
    private By messageTextarea = By.name("message");
    private By uploadFileInput = By.name("upload_file");
    private By submitButton = By.name("submit");
    private By successMessage = By.cssSelector("div.status.alert.alert-success");
    private By homeButton = By.xpath("//a[contains(@class, 'btn-success') and span[contains(text(), 'Home')]]");

    // Page Actions
    public String getGetInTouchTitle() {
        return driver.findElement(getInTouchTitle).getText();
    }

    public void fillContactForm(String name, String email, String subject, String message) {
        driver.findElement(nameInput).sendKeys(name);
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(subjectInput).sendKeys(subject);
        driver.findElement(messageTextarea).sendKeys(message);
    }

    public void uploadFile(String filePath) {
        driver.findElement(uploadFileInput).sendKeys(filePath);
    }

    public void clickSubmitButton() {
        driver.findElement(submitButton).click();
    }

    public void acceptAlert() {
        driver.switchTo().alert().accept();
    }

    public String getSuccessMessage() {
        return driver.findElement(successMessage).getText();
    }

    public void clickHomeButton() {
        driver.findElement(homeButton).click();
    }



}


