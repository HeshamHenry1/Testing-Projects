package com.mytests.login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class CartPage {

    private WebDriver driver;

    // Locator for the specific item in the cart by its name
    private By backpackInCart = By.xpath("//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']");
    private By removeBackpackButton = By.id("remove-sauce-labs-backpack");
    private By checkoutButton = By.id("checkout");

    public CartPage(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Checks if the Sauce Labs Backpack is displayed in the cart.
     * @return true if the item is found, false otherwise.
     */
    public boolean isBackpackDisplayed() {
        // We use findElements to avoid an error if the item is not found.
        // If the returned list is not empty, it means the item was found.
        return !driver.findElements(backpackInCart).isEmpty();
    }
    public void removeBackpack() {
        driver.findElement(removeBackpackButton).click();
    }
    public CheckoutPage goToCheckout() {
        driver.findElement(checkoutButton).click();
        return new CheckoutPage(driver);
    }
}

