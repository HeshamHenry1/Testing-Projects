package com.mytests.login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ProductsPage {

    private WebDriver driver;

    // تعريف عنصر عنوان الصفحة
    private By pageTitle = By.className("title");
    private By inventoryItems = By.className("inventory_item");
    private By shoppingCartLink = By.className("shopping_cart_link");
    private By addToCartSauceLabsBackpackButton = By.xpath("//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button");


    public ProductsPage(WebDriver driver) {
        this.driver = driver;
    }

    // دالة للحصول على نص العنوان
    public String getPageTitle() {
        return driver.findElement(pageTitle).getText();
    }
    public int getNumberOfProducts() {

        return driver.findElements(inventoryItems).size();
    }
    public void addSauceLabsBackpackToCart() {
        driver.findElement(addToCartSauceLabsBackpackButton).click();
    }
    public String getSauceLabsBackpackButtonText() {
        return driver.findElement(addToCartSauceLabsBackpackButton).getText();
    }
    public String getShoppingCartBadgeValue() {
        return driver.findElement(shoppingCartLink).getText();
    }
    public boolean isCartBadgeNotDisplayed() {
        // findElements (مع s) لا يسبب خطأ إذا لم يجد العنصر، بل يرجع قائمة فارغة.
        // .isEmpty() تتحقق مما إذا كانت القائمة فارغة.
        return driver.findElements(By.className("shopping_cart_badge")).isEmpty();
    }
    // لذلك، هي ترجع كائن جديد من CartPage
    public CartPage goToShoppingCart() {
        driver.findElement(shoppingCartLink).click();
        return new CartPage(driver);
    }

}
