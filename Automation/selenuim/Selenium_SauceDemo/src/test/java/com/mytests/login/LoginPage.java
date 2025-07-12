package com.mytests.login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Alert;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;


public class LoginPage {


    private WebDriver driver;

    private By usernameInput = By.id("user-name");
    private By passwordInput = By.id("password");
    private By loginButton = By.id("login-button");
    private By errorMessageContainer = By.cssSelector("h3[data-test='error']");
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    private void acceptAlertIfPresent(WebDriver driver) {
        try {
            // انتظر لمدة ثانيتين كحد أقصى حتى يظهر التنبيه
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
            wait.until(ExpectedConditions.alertIsPresent());

            // إذا وصل الكود إلى هنا، فهذا يعني أن التنبيه موجود
            Alert alert = driver.switchTo().alert();
            System.out.println("Alert detected with text: " + alert.getText()); // لطباعة نص التنبيه (مفيد للتصحيح)
            alert.accept(); // انقر على "OK" أو "Accept"
            System.out.println("Alert accepted.");

        } catch (TimeoutException e) {

        }
    }


    public void enterUsername(String username) {
        driver.findElement(usernameInput).sendKeys(username);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordInput).sendKeys(password);
    }

    public void clickLoginButton() {
        driver.findElement(loginButton).click();
    }

    // لاحظ التغيير هنا: الدالة الآن ترجع كائن من نوع ProductsPage
    public ProductsPage login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
        acceptAlertIfPresent(driver);
        // عند تسجيل الدخول، ننتقل إلى صفحة المنتجات، لذا نرجع كائن جديد منها
        return new ProductsPage(driver);
    }

    public String getErrorMessage() {
        return driver.findElement(errorMessageContainer).getText();
    }




}
