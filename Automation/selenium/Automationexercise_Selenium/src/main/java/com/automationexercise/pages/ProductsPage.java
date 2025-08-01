package com.automationexercise.pages;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class ProductsPage {
    private WebDriver driver;
    public ProductsPage(WebDriver driver) {
        this.driver = driver;
    }

    //Locators
    private By allProductsTitle = By.xpath("//h2[text()='All Products']");
    private By productsList = By.cssSelector("div.features_items div.col-sm-4");
    private By firstProductViewLink = By.xpath("(//a[text()='View Product'])[1]");
    private By productName = By.cssSelector("div.product-information h2");
    private By productCategory = By.xpath("//p[contains(text(), 'Category:')]");
    private By productPrice = By.cssSelector("div.product-information span span");
    private By productAvailability = By.xpath("//b[text()='Availability:']");
    private By productCondition = By.xpath("//b[text()='Condition:']");
    private By productBrand = By.xpath("//b[text()='Brand:']");

    private By searchInput = By.id("search_product");
    private By searchButton = By.id("submit_search");
    private By searchedProductsTitle = By.xpath("//h2[text()='Searched Products']");
    private By searchedProductItems = By.cssSelector("div.features_items div.product-image-wrapper");

    private By firstProduct = By.xpath("(//div[@class='product-image-wrapper'])[1]");
    private By secondProduct = By.xpath("(//div[@class='product-image-wrapper'])[2]");
    private By addToCartButton = By.xpath(".//a[contains(@class, 'add-to-cart')]"); // .// للبحث داخل العنصر الأب
    private By continueShoppingButton = By.xpath("//button[text()='Continue Shopping']");
    private By viewCartLink = By.xpath("//u[text()='View Cart']");

    private By quantityInput = By.id("quantity");
    private By addToCartDetailButton = By.cssSelector("button.cart");


    private By brandsSidebar = By.xpath("//h2[text()='Brands']");
    private By poloBrandLink = By.xpath("//div[@class='brands_products']//a[@href='/brand_products/Polo']");
    private By hAndMBrandLink = By.xpath("//div[@class='brands_products']//a[@href='/brand_products/H&M']");

    private By brandPageTitle = By.cssSelector("h2.title.text-center");
    private By brandProductsList = By.cssSelector("div.features_items div.product-image-wrapper");

    private By productNameFromCard = By.cssSelector("div.productinfo p");

    private By writeYourReviewTitle = By.xpath("//a[text()='Write Your Review']");
    private By reviewNameInput = By.id("name");
    private By reviewEmailInput = By.id("email");
    private By reviewTextArea = By.id("review");
    private By reviewSubmitButton = By.id("button-review");
    private By reviewSuccessMessage = By.xpath("//div[@class='alert-success alert']/span");


    // Page Actions
    public String getAllProductsTitle() {
        return driver.findElement(allProductsTitle).getText();
    }

    public boolean areProductsVisible() {
        List<WebElement> productItems = driver.findElements(productsList);
        return !productItems.isEmpty();
    }

    public void clickFirstProductViewLink() {
        driver.findElement(firstProductViewLink).click();
    }

    public boolean areProductDetailsVisible() {
        boolean isNameVisible = driver.findElement(productName).isDisplayed();
        boolean isCategoryVisible = driver.findElement(productCategory).isDisplayed();
        boolean isPriceVisible = driver.findElement(productPrice).isDisplayed();
        boolean isAvailabilityVisible = driver.findElement(productAvailability).isDisplayed();
        boolean isConditionVisible = driver.findElement(productCondition).isDisplayed();
        boolean isBrandVisible = driver.findElement(productBrand).isDisplayed();

        return isNameVisible && isCategoryVisible && isPriceVisible && isAvailabilityVisible && isConditionVisible && isBrandVisible;
    }
    public String getProductName() {
        return driver.findElement(productName).getText();
    }

    public String getProductCategory() {
        return driver.findElement(productCategory).getText();
    }

    public String getProductPrice() {
        return driver.findElement(productPrice).getText();
    }

    public String getProductAvailability() {
        return driver.findElement(productAvailability).getText();
    }

    public String getProductCondition() {
        return driver.findElement(productCondition).getText();
    }

    public String getProductBrand() {
        return driver.findElement(productBrand).getText();
    }

    public void printProductDetails() {
        System.out.println("================ Product Details ================");
        System.out.println("Name: " + getProductName());
        System.out.println("Price: " + getProductPrice());
        System.out.println(getProductCategory()); // النص يحتوي على "Category:" بالفعل
        System.out.println(getProductAvailability());
        System.out.println(getProductCondition());
        System.out.println(getProductBrand());
        System.out.println("===============================================");
    }

    public void searchForProduct(String productName) {
        driver.findElement(searchInput).sendKeys(productName);
        driver.findElement(searchButton).click();
    }
    public boolean isSearchedProductsTitleVisible() {
        try {
            return driver.findElement(searchedProductsTitle).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    public boolean areAllSearchedProductsRelated(String productName) {
        List<WebElement> productItems = driver.findElements(searchedProductItems);


        if (productItems.isEmpty()) {
            return false;
        }


        for (WebElement product : productItems) {
            String productText = product.getText();
            if (!productText.toLowerCase().contains(productName.toLowerCase())) {
                System.out.println("Found unrelated product: " + productText);
                return false;
            }
        }

        return true;
    }

    public void addProductToCart(WebElement productElement) {
        Actions actions = new Actions(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        actions.moveToElement(productElement).perform();

        WebElement cartButton = wait.until(ExpectedConditions.elementToBeClickable(productElement.findElement(addToCartButton)));


        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", cartButton);
    }

    public WebElement getFirstProduct() {
        return driver.findElement(firstProduct);
    }

    public WebElement getSecondProduct() {
        return driver.findElement(secondProduct);
    }

    public void clickContinueShopping() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(continueShoppingButton)).click();
    }

    public void clickViewCart() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(viewCartLink)).click();
    }


    public void setProductQuantity(String quantity) {
        WebElement quantityField = driver.findElement(quantityInput);
        quantityField.clear(); // نمسح القيمة الحالية (عادة تكون '1')
        quantityField.sendKeys(quantity);
    }


    public void clickAddToCartOnDetailPage() {
        driver.findElement(addToCartDetailButton).click();
    }





    public boolean areBrandsVisible() {
        return driver.findElement(brandsSidebar).isDisplayed();
    }


    public void clickPoloBrandLink() {
        driver.findElement(poloBrandLink).click();
    }


    public void clickHAndMBrandLink() {
        driver.findElement(hAndMBrandLink).click();
    }


    public String getBrandPageTitleText() {
        return driver.findElement(brandPageTitle).getText();
    }


    public boolean areBrandProductsDisplayed() {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(brandProductsList));
        return !driver.findElements(brandProductsList).isEmpty();
    }



    public List<String> addAllDisplayedProductsToCart() {
        List<WebElement> productItems = driver.findElements(searchedProductItems); // 'searchedProductItems' تم تعريفه سابقًا
        List<String> addedProductNames = new ArrayList<>();
        Actions actions = new Actions(driver);

        for (WebElement product : productItems) {

            String productName = product.findElement(productNameFromCard).getText();
            addedProductNames.add(productName);


            actions.moveToElement(product).perform();


            WebElement addToCartBtn = product.findElement(By.xpath(".//a[contains(@class, 'add-to-cart')]"));
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", addToCartBtn);


            clickContinueShopping();
        }
        return addedProductNames;
    }


    public boolean isWriteYourReviewVisible() {
        return driver.findElement(writeYourReviewTitle).isDisplayed();
    }


    public void submitReview(String name, String email, String review) {
        driver.findElement(reviewNameInput).sendKeys(name);
        driver.findElement(reviewEmailInput).sendKeys(email);
        driver.findElement(reviewTextArea).sendKeys(review);
        driver.findElement(reviewSubmitButton).click();
    }


    public String getReviewSuccessMessage() {
        // ننتظر قليلاً لظهور الرسالة لأنها تظهر ديناميكيًا
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(reviewSuccessMessage)).getText();
    }
}
