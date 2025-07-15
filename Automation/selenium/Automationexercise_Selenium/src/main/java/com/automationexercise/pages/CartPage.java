package com.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CartPage {
    private WebDriver driver;

    // محددات عناصر الاشتراك في الـ footer (مكررة من HomePage)
    private By subscriptionTitle = By.xpath("//h2[text()='Subscription']");
    private By subscriptionEmailInput = By.id("susbscribe_email");
    private By subscriptionArrowButton = By.id("subscribe");
    private By successMessageAlert = By.id("success-subscribe");

    // محددات لصفوف المنتجات في السلة
    private By cartRows = By.cssSelector("tbody tr");
    private By productName = By.cssSelector("td.cart_description h4 a");
    private By productPrice = By.cssSelector("td.cart_price p");
    private By productQuantity = By.cssSelector("td.cart_quantity button");
    private By productTotalPrice = By.cssSelector("td.cart_total p");

    // proceedToCheckoutButton

    private By proceedToCheckoutButton = By.xpath("//a[text()='Proceed To Checkout']");


    // محدد لزر الحذف 'X' (عادة يكون داخل صف المنتج)
    private By deleteButton = By.cssSelector("td.cart_delete a.cart_quantity_delete");

    // محدد لرسالة "Cart is empty!"
    private By cartEmptyMessage = By.xpath("//b[text()='Cart is empty!']");

    public CartPage(WebDriver driver) {
        this.driver = driver;
    }

    // دوال مكررة من HomePage (يمكن وضعها في كلاس BasePage في المستقبل)
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


    /**
     * تقوم بإرجاع عدد المنتجات (الصفوف) في السلة.
     * @return عدد المنتجات.
     */
    public int getNumberOfProductsInCart() {
        return driver.findElements(cartRows).size();
    }

    /**
     * تقوم بجمع كل تفاصيل المنتجات من السلة.
     * @return قائمة تحتوي على تفاصيل كل منتج.
     */
    public List<Map<String, String>> getProductsDetailsInCart() {
        List<Map<String, String>> products = new ArrayList<>();
        List<WebElement> rows = driver.findElements(cartRows);

        for (WebElement row : rows) {
            Map<String, String> productDetails = new HashMap<>();
            productDetails.put("name", row.findElement(productName).getText());
            productDetails.put("price", row.findElement(productPrice).getText());
            productDetails.put("quantity", row.findElement(productQuantity).getText());
            productDetails.put("total", row.findElement(productTotalPrice).getText());
            products.add(productDetails);
        }
        return products;
    }

    public String getFirstProductQuantity() {
        // نفترض أن المنتج الذي أضفناه هو الوحيد أو الأول في السلة
        WebElement firstRow = driver.findElement(cartRows); // cartRows تم تعريفه سابقًا
        return firstRow.findElement(productQuantity).getText(); // productQuantity تم تعريفه سابقًا
    }

    public void clickProceedToCheckout() {
        driver.findElement(proceedToCheckoutButton).click();
    }


    /**
     * تقوم بالضغط على زر الحذف 'X' للمنتج الأول في السلة.
     */
    public void clickDeleteButtonForFirstProduct() {
        driver.findElement(deleteButton).click();
    }

    /**
     * تتحقق مما إذا كانت السلة فارغة عن طريق البحث عن رسالة "Cart is empty!".
     * @return true إذا كانت الرسالة ظاهرة، و false إذا لم تكن.
     */
    public boolean isCartEmpty() {
        try {
            // نستخدم انتظارًا قصيرًا لأن إزالة العنصر قد تستغرق لحظة (بسبب AJAX)
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
            return wait.until(ExpectedConditions.visibilityOfElementLocated(cartEmptyMessage)).isDisplayed();
        } catch (Exception e) {
            // إذا لم تظهر الرسالة، فالسلة ليست فارغة
            return false;
        }
    }

    /**
     * تتحقق مما إذا كانت كل المنتجات الموجودة في قائمة معينة ظاهرة في السلة.
     * @param expectedProductNames قائمة بأسماء المنتجات المتوقع وجودها.
     * @return true إذا كانت كل المنتجات موجودة، و false إذا كان هناك منتج مفقود.
     */
    public boolean areProductsPresentInCart(List<String> expectedProductNames) {
        List<Map<String, String>> productsInCart = getProductsDetailsInCart(); // هذه الدالة يجب أن تكون موجودة من اختبار سابق

        // نحول قائمة تفاصيل المنتجات في السلة إلى قائمة أسماء فقط لسهولة المقارنة
        List<String> actualProductNames = new ArrayList<>();
        for (Map<String, String> product : productsInCart) {
            actualProductNames.add(product.get("name"));
        }

        // نتأكد من أن كل منتج متوقع موجود في القائمة الفعلية
        return actualProductNames.containsAll(expectedProductNames);
    }
}
