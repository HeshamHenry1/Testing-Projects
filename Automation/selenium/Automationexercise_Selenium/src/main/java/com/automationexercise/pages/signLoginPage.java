package com.automationexercise.pages;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class signLoginPage {
    WebDriver driver;

    // Constructor
    public signLoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Web Elements - Login Section
    @FindBy(css = ".login-form h2")
    WebElement loginToYourAccountText;

    @FindBy(name = "email")
    WebElement loginEmailInput;

    @FindBy(name = "password")
    WebElement loginPasswordInput;

    @FindBy(css = ".login-form .btn.btn-default")
    WebElement loginButton;

    @FindBy(css = ".login-form p")
    WebElement loginErrorMessage;



    // Web Elements - Signup Section
    @FindBy(css = ".signup-form h2")
    WebElement newUserSignupText;

    @FindBy(name = "name")
    WebElement signupNameInput;

    @FindBy(css = ".signup-form input[name='email']")
    WebElement signupEmailInput;

    @FindBy(css = ".signup-form .btn.btn-default")
    WebElement signupButton;

    @FindBy(css = ".signup-form p")
    WebElement signupErrorMessage;



    // Page Actions - Login
    public String getLoginToYourAccountText() {
        return loginToYourAccountText.getText();
    }

    public void enterLoginEmail(String email) {
        loginEmailInput.sendKeys(email);
    }

    public void enterLoginPassword(String password) {
        loginPasswordInput.sendKeys(password);
    }

    public void clickLoginButton() {
        loginButton.click();
    }

    public String getLoginErrorMessage() {
        return loginErrorMessage.getText();
    }

    // Page Actions - Signup
    public String getNewUserSignupText() {
        return newUserSignupText.getText();
    }

    public void enterSignupName(String name) {
        signupNameInput.sendKeys(name);
    }

    public void enterSignupEmail(String email) {
        signupEmailInput.sendKeys(email);
    }

    public void clickSignupButton() {
        signupButton.click();
    }

    public String getSignupErrorMessage() {
        return signupErrorMessage.getText();
    }
    public void login(String email, String password) {
        // الخطوة 1: إدخال البريد الإلكتروني
        enterLoginEmail(email);

        // الخطوة 2: إدخال كلمة المرور
        enterLoginPassword(password);

        // الخطوة 3: الضغط على زر تسجيل الدخول
        clickLoginButton();
    }

    public void signupAndCreateAccount(String name, String email, String title, String password, String day, String month, String year, String firstName, String lastName, String company, String address1, String address2, String country, String state, String city, String zipcode, String mobile) {
        // هذه الكائنات يجب أن تكون معرفة كمتغيرات عضو في الكلاس
        AccountInformationPage accountInformationPage = new AccountInformationPage(driver);
        AccountCreatedPage accountCreatedPage = new AccountCreatedPage(driver);

        // خطوات التسجيل
        this.enterSignupName(name);
        this.enterSignupEmail(email);
        this.clickSignupButton();

        accountInformationPage.selectTitle(title);
        accountInformationPage.enterPassword(password);
        accountInformationPage.selectDateOfBirth(day, month, year);
        accountInformationPage.fillAddressDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile);
        accountInformationPage.clickCreateAccountButton();

        accountCreatedPage.clickContinueButton();
    }

}
