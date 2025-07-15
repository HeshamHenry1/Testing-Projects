package com.automationexercise.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

public class AccountInformationPage {

    WebDriver driver;

    public AccountInformationPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }


// WebElement

    @FindBy(css = ".login-form h2.title.text-center b")
    WebElement enterAccountInformationText;

    @FindBy(id = "id_gender1")
    WebElement mrRadioButton;

    @FindBy(id = "id_gender2")
    WebElement mrsRadioButton;

    @FindBy(id = "password")
    WebElement passwordInput;

    @FindBy(id = "days")
    WebElement daysDropdown;

    @FindBy(id = "months")
    WebElement monthsDropdown;

    @FindBy(id = "years")
    WebElement yearsDropdown;

    @FindBy(id = "newsletter")
    WebElement newsletterCheckbox;

    @FindBy(id = "optin")
    WebElement specialOffersCheckbox;

    @FindBy(id = "first_name")
    WebElement firstNameInput;

    @FindBy(id = "last_name")
    WebElement lastNameInput;

    @FindBy(id = "company")
    WebElement companyInput;

    @FindBy(id = "address1")
    WebElement address1Input;

    @FindBy(id = "address2")
    WebElement address2Input;

    @FindBy(id = "country")
    WebElement countryDropdown;

    @FindBy(id = "state")
    WebElement stateInput;

    @FindBy(id = "city")
    WebElement cityInput;

    @FindBy(id = "zipcode")
    WebElement zipcodeInput;

    @FindBy(id = "mobile_number")
    WebElement mobileNumberInput;

    @FindBy(css = "button[data-qa=\'create-account\']")
    WebElement createAccountButton;


    // Page Actions
    public String getEnterAccountInformationText() {
        return enterAccountInformationText.getText();
    }

    public void selectTitle(String title) {
        if (title.equalsIgnoreCase("Mr.")) {
            mrRadioButton.click();
        } else if (title.equalsIgnoreCase("Mrs.")) {
            mrsRadioButton.click();
        }
    }

    public void enterPassword(String password) {
        passwordInput.sendKeys(password);
    }

    public void selectDateOfBirth(String day, String month, String year) {
        new Select(daysDropdown).selectByValue(day);
        new Select(monthsDropdown).selectByVisibleText(month);
        new Select(yearsDropdown).selectByValue(year);
    }

    public void checkNewsletterCheckbox() {
        if (!newsletterCheckbox.isSelected()) {
            newsletterCheckbox.click();
        }
    }

    public void checkSpecialOffersCheckbox() {
        if (!specialOffersCheckbox.isSelected()) {
            specialOffersCheckbox.click();
        }
    }

    public void fillAddressDetails(String firstName, String lastName, String company, String address1, String address2, String country, String state, String city, String zipcode, String mobileNumber) {
        firstNameInput.sendKeys(firstName);
        lastNameInput.sendKeys(lastName);
        companyInput.sendKeys(company);
        address1Input.sendKeys(address1);
        address2Input.sendKeys(address2);
        new Select(countryDropdown).selectByVisibleText(country);
        stateInput.sendKeys(state);
        cityInput.sendKeys(city);
        zipcodeInput.sendKeys(zipcode);
        mobileNumberInput.sendKeys(mobileNumber);
    }

    public void clickCreateAccountButton() {
        createAccountButton.click();
    }
}
