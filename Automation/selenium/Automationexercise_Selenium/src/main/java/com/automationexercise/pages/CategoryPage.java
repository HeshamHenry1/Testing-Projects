package com.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CategoryPage {
    private WebDriver driver;


    private By categoryTitle = By.cssSelector("h2.title.text-center");

    public CategoryPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getCategoryTitleText() {
        return driver.findElement(categoryTitle).getText();
    }
}
