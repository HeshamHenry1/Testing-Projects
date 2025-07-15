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
    // محددات عناصر الاشتراك في الـ footer
    private By subscriptionTitle = By.xpath("//h2[text()='Subscription']");
    private By subscriptionEmailInput = By.id("susbscribe_email");
    private By subscriptionArrowButton = By.id("subscribe");
    private By successMessageAlert = By.id("success-subscribe");
    // محدد (selector) لزر "Cart"
    private By cartButton = By.xpath("//a[contains(text(), 'Cart')]");


    // محددات للشريط الجانبي للفئات
    private By categoriesSidebar = By.id("accordian"); // الـ ID الخاص بقائمة الفئات
    private By womenCategoryLink = By.xpath("//a[@href='#Women']");
    private By womenDressSubCategoryLink = By.xpath("//div[@id='Women']//a[text()='Dress ']");
    private By menCategoryLink = By.xpath("//a[@href='#Men']");
    private By menTshirtsSubCategoryLink = By.xpath("//div[@id='Men']//a[text()='Tshirts ']");


    // محددات قسم "RECOMMENDED ITEMS"
    private By recommendedItemsSection = By.cssSelector("div.recommended_items");
    // محدد لزر "Add to cart" الخاص بأول منتج في قائمة الموصى بها
    private By firstRecommendedProductAddToCart = By.xpath("//div[@class='recommended_items']//div[@class='item active']//a[contains(@class, 'add-to-cart')]");
    // محدد لرابط "View Cart" الذي يظهر في النافذة المنبثقة
    private By viewCartLinkInModal = By.xpath("//div[@id='cartModal']//u[text()='View Cart']");

    // محدد لزر السهم للأعلى (Scroll Up Arrow)
    private By scrollUpArrow = By.id("scrollUp");

    // محدد للنص الموجود في أعلى شريط التمرير (Carousel)
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
            // نبحث عن العنصر الذي يحتوي على "Logged in as"
            // By.xpath("//a[contains(text(), 'Logged in as')]") هو محدد جيد
            return driver.findElement(By.xpath("//li/a[contains(text(), 'Logged in as')]")).isDisplayed();
        } catch (Exception e) {
            // إذا لم يتم العثور على العنصر، سيعطي استثناء (exception)
            // وفي هذه الحالة، نعلم أن المستخدم لم يسجل دخوله، فنرجع false
            return false;
        }
    }

    public void clickDeleteAccountLink() {
        deleteAccountLink.click();
    }
    public void scrollToFooter() {
        // نستخدم JavaScriptExecutor للتمرير إلى أسفل الصفحة
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
        // قد نحتاج إلى انتظار قصير لظهور الرسالة
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement successMessageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(successMessageAlert));
        return successMessageElement.getText();
    }

    /**
     * تقوم بالضغط على زر "Cart" في الهيدر.
     */
    public void clickCartButton() {
        driver.findElement(cartButton).click();
    }



    /**
     * تتحقق من ظهور الشريط الجانبي للفئات.
     * @return true إذا كان الشريط ظاهرًا.
     */
    public boolean areCategoriesVisible() {
        return driver.findElement(categoriesSidebar).isDisplayed();
    }

    /**
     * تقوم بالضغط على فئة "Women".
     */
    public void clickWomenCategory() {
        driver.findElement(womenCategoryLink).click();
    }

    /**
     * تقوم بالضغط على فئة "Dress" الفرعية تحت "Women".
     */
    public void clickWomenDressSubCategory() {
        driver.findElement(womenDressSubCategoryLink).click();
    }

    /**
     * تقوم بالضغط على فئة "Men".
     */
    public void clickMenCategory() {
        driver.findElement(menCategoryLink).click();
    }

    /**
     * تقوم بالضغط على فئة "Tshirts" الفرعية تحت "Men".
     */
    public void clickMenTshirtsSubCategory() {
        driver.findElement(menTshirtsSubCategoryLink).click();
    }


    /**
     * تقوم بالتمرير إلى قسم "RECOMMENDED ITEMS".
     * (يمكن استخدام scrollToFooter() إذا كان القسم في الأسفل، أو طريقة أكثر تحديدًا)
     */
    public void scrollToRecommendedItems() {
        WebElement recommendedSection = driver.findElement(recommendedItemsSection);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", recommendedSection);
    }

    /**
     * تتحقق من ظهور قسم "RECOMMENDED ITEMS".
     * @return true إذا كان القسم ظاهرًا.
     */
    public boolean areRecommendedItemsVisible() {
        return driver.findElement(recommendedItemsSection).isDisplayed();
    }

    /**
     * تقوم بالضغط على زر "Add to cart" لأول منتج موصى به.
     */
    public void addFirstRecommendedProductToCart() {
        driver.findElement(firstRecommendedProductAddToCart).click();
    }

    /**
     * تقوم بالضغط على رابط "View Cart" في النافذة المنبثقة.
     */
    public void clickViewCartInModal() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(viewCartLinkInModal)).click();
    }


    /**
     * تقوم بالضغط على زر السهم للأعلى.
     */
    public void clickScrollUpArrow() {
        driver.findElement(scrollUpArrow).click();
    }

    /**
     * تتحقق من ظهور النص "Full-Fledged practice website..." في أعلى الصفحة.
     * @return true إذا كان النص ظاهرًا.
     */
    public boolean isFullFledgedTextVisible() {
        // ننتظر قليلاً بعد التمرير للأعلى للتأكد من أن العنصر أصبح مرئيًا
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
