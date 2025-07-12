package com.mytests.login;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.openqa.selenium.chrome.ChromeOptions;



public class LoginTest {

    private WebDriver driver;
    private LoginPage loginPage;
    private ProductsPage productsPage;

    @BeforeMethod
    public void setUp() {
        // تهيئة خيارات Chrome
        ChromeOptions options = new ChromeOptions();
        // إضافة خيار لتعطيل واجهة المستخدم الخاصة بإدارة كلمات المرور
        options.addArguments("--disable-features=PasswordManagerUI");

        // تشغيل ChromeDriver مع هذه الخيارات الجديدة
        driver = new ChromeDriver(options);

        driver.get("https://www.saucedemo.com/" );
        driver.manage().window().maximize();
        // هنا نقوم بإنشاء object من كلاس LoginPage ونمرر له الـ driver
        loginPage = new LoginPage(driver);
    }
    @Test
    public void successfulLoginTest() {
        // الخطوة 1: قم بتسجيل الدخول، والناتج هو "صفحة المنتجات"
        productsPage = loginPage.login("standard_user", "secret_sauce");

        // الخطوة 2: الآن يمكنك التحقق مباشرة من عنوان صفحة المنتجات
        String actualTitle = productsPage.getPageTitle();

        Assert.assertEquals(actualTitle, "Products");
    }

    @Test
    public void failedLoginWithWrongPasswordTest() {

        loginPage.login("standard_user", "wrong_password");


        String actualErrorMessage = loginPage.getErrorMessage();


        String expectedErrorMessage = "Epic sadface: Username and password do not match any user in this service";


        Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "Error message is not correct!");
    }
    @Test
    public void failedLoginWithEmptyUsernameTest() {
        // الخطوة 1: قم بتسجيل الدخول باسم مستخدم فارغ
        loginPage.login("", "secret_sauce");

        String actualErrorMessage = loginPage.getErrorMessage();


        String expectedErrorMessage = "Epic sadface: Username is required";


        Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "Error message is not correct!");

    }
    @Test
    public void failedLoginWithEmptyPasswordTest() {
        // الخطوة 1: قم بتسجيل الدخول بكلمة مرور فارغة
        loginPage.login("standard_user", "");

        // الخطوة 2: احصل على رسالة الخطأ الفعلية من الصفحة
        String actualErrorMessage = loginPage.getErrorMessage();

        // الخطوة 3: عرّف رسالة الخطأ المتوقعة
        String expectedErrorMessage = "Epic sadface: Password is required";

        // الخطوة 4: تحقق من أن الرسالة الفعلية تطابق الرسالة المتوقعة
        Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "Error message is not correct!");
    }
    @Test
    public void failedLoginWithLockedOutUserTest() {
        // الخطوة 1: حاول تسجيل الدخول بحساب المستخدم المقفل
        loginPage.login("locked_out_user", "secret_sauce");
        // الخطوة 2: احصل على رسالة الخطأ الفعلية من الصفحة
        String actualErrorMessage = loginPage.getErrorMessage();

// الخطوة 3: عرّف رسالة الخطأ المتوقعة
        String expectedErrorMessage = "Epic sadface: Sorry, this user has been locked out.";

        // الخطوة 4: تحقق من أن الرسالة الفعلية تطابق الرسالة المتوقعة
        Assert.assertEquals(actualErrorMessage, expectedErrorMessage, "Error message is not correct!");
    }


    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
