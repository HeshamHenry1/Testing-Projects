package com.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class HomePage {
    WebDriver driver;
    // Constructor
    public HomePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    // Web Elements
    @FindBy(css = ".shop-menu ul li:nth-child(2) a")
    WebElement productsLink;

    @FindBy(css = ".shop-menu ul li:nth-child(3) a")
    WebElement cartLink;

    @FindBy(css = ".shop-menu ul li:nth-child(4) a")
    WebElement signupLoginLink;

    @FindBy(css = ".shop-menu ul li:nth-child(5) a")
    WebElement testCasesLink;

    @FindBy(css = ".shop-menu ul li:nth-child(6) a")
    WebElement apiTestingLink;

    @FindBy(css = ".shop-menu ul li:nth-child(7) a")
    WebElement videoTutorialsLink;

    @FindBy(css = ".shop-menu ul li:nth-child(8) a")
    WebElement contactUsLink;

    @FindBy(css = ".shop-menu ul li:nth-child(10) a b")
    WebElement loggedInAsUsername;

    @FindBy(css = ".shop-menu ul li:nth-child(5) a")
    WebElement deleteAccountLink;

    @FindBy(css = ".shop-menu ul li:nth-child(4) a")
    WebElement LogoutLink;
    private By subscriptionTitle = By.xpath("//h2[text()='Subscription']");
    private By subscriptionEmailInput = By.id("susbscribe_email");
    private By subscriptionArrowButton = By.id("subscribe");
    private By successMessageAlert = By.id("success-subscribe");
    private By cartButton = By.xpath("//a[contains(text(), 'Cart')]");


    private By categoriesSidebar = By.id("accordian"); // الـ ID الخاص بقائمة الفئات
    private By womenCategoryLink = By.xpath("//a[@href='#Women']");
    private By womenDressSubCategoryLink = By.xpath("//div[@id='Women']//a[text()='Dress ']");
    private By menCategoryLink = By.xpath("//a[@href='#Men']");
    private By menTshirtsSubCategoryLink = By.xpath("//div[@id='Men']//a[text()='Tshirts ']");



    private By recommendedItemsSection = By.cssSelector("div.recommended_items");

    private By firstRecommendedProductAddToCart = By.xpath("//div[@class='recommended_items']//div[@class='item active']//a[contains(@class, 'add-to-cart')]");

    private By viewCartLinkInModal = By.xpath("//div[@id='cartModal']//u[text()='View Cart']");


    private By scrollUpArrow = By.id("scrollUp");


    private By fullFledgedText = By.xpath("//div[@class='item active']//h2[contains(text(),'Full-Fledged practice website')]");





    // Page Actions
    public void clickProductsLink() {
        productsLink.click();
    }

    public void clickCartLink() {
        cartLink.click();
    }

    public void clickSignupLoginLink() {
        signupLoginLink.click();
    }

    public void clickTestCasesLink() {
        testCasesLink.click();
    }

    public void clickApiTestingLink() {
        apiTestingLink.click();
    }

    public void clickVideoTutorialsLink() {
        videoTutorialsLink.click();
    }

    public void clickContactUsLink() {
        contactUsLink.click();
    }
    public void clickLogoutLink(){
        LogoutLink.click();
    }

    public String getHomePageTitle() {
        return driver.getTitle();
    }

    public String getHomePageUrl() {
        return driver.getCurrentUrl();
    }

    public String getLoggedInAsUsernameText() {
        return loggedInAsUsername.getText();
    }
    public boolean isUserLoggedIn() {
        try {

            return driver.findElement(By.xpath("//li/a[contains(text(), 'Logged in as')]")).isDisplayed();
        } catch (Exception e) {

            return false;
        }
    }

    public void clickDeleteAccountLink() {
        deleteAccountLink.click();
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


    public void clickCartButton() {
        driver.findElement(cartButton).click();
    }




    public boolean areCategoriesVisible() {
        return driver.findElement(categoriesSidebar).isDisplayed();
    }


    public void clickWomenCategory() {
        driver.findElement(womenCategoryLink).click();
    }


    public void clickWomenDressSubCategory() {
        driver.findElement(womenDressSubCategoryLink).click();
    }


    public void clickMenCategory() {
        driver.findElement(menCategoryLink).click();
    }


    public void clickMenTshirtsSubCategory() {
        driver.findElement(menTshirtsSubCategoryLink).click();
    }



    public void scrollToRecommendedItems() {
        WebElement recommendedSection = driver.findElement(recommendedItemsSection);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", recommendedSection);
    }


    public boolean areRecommendedItemsVisible() {
        return driver.findElement(recommendedItemsSection).isDisplayed();
    }


    public void addFirstRecommendedProductToCart() {
        driver.findElement(firstRecommendedProductAddToCart).click();
    }


    public void clickViewCartInModal() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(viewCartLinkInModal)).click();
    }



    public void clickScrollUpArrow() {
        driver.findElement(scrollUpArrow).click();
    }


    public boolean isFullFledgedTextVisible() {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(fullFledgedText)).isDisplayed();
    }



    public boolean isSubscriptionTextVisible() {
        return driver.findElement(subscriptionTitle).isDisplayed();
    }

    public void scrollToTop() {
        ((JavascriptExecutor) driver).executeScript("window.scrollTo(0, 0)");
    }

}
