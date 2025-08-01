# Automation Exercise Website Test Automation Project

This project contains a comprehensive set of Automation Tests for the [Automation Exercise](http://automationexercise.com) website, which is specifically designed for practicing web application test automation. This project was built using Java, Selenium WebDriver, TestNG, and Maven.

## 🌟 Project Overview

The goal of this project is to apply best practices in test automation, including:
-   **Page Object Model (POM)**: To separate test logic from page element locators, making the code more organized and easier to maintain.
-   **Dependency Management with Maven**: For easy management of external libraries and ensuring consistent project builds.
-   **TestNG Testing Framework**: For organizing, managing, executing test cases, and generating detailed reports.
-   **WebDriverManager**: To automate the management of browser drivers easily.

---

## 💻 Technologies and Tools Used

-   **Programming Language**: [Java](https://www.java.com/)
-   **Automation Tool**: [Selenium WebDriver](https://www.selenium.dev/)
-   **Testing Framework**: [TestNG](https://testng.org/)
-   **Build Automation and Dependency Management Tool**: [Apache Maven](https://maven.apache.org/)
-   **Helper Library**: [WebDriverManager](https://github.com/bonigarcia/webdrivermanager)

---

## ✅ Test Cases Covered

This project covers 26 comprehensive test cases covering most of the main website functionalities:

1.  **Register User**: Verify successful creation of a new account.
2.  **Login User**: Verify login with valid and invalid credentials.
3.  **Logout User**: Verify successful logout.
4.  **Register with existing email**.
5.  **Contact Us Form**.
6.  **Verify Test Cases Page**.
7.  **Verify Products & Product Detail Page**.
8.  **Search Product**.
9.  **Subscription**: From Home Page and Cart Page.
10. **Add Products to Cart**.
11. **Verify Product Quantity in Cart**.
12. **Place Order**: Scenarios for registration before and during checkout, and login before checkout.
13. **Remove Products From Cart**.
14. **View Products by Category & Brand**.
15. **Cart Continuity after Login**.
16. **Add review on product**.
17. **Add product from "Recommended items" section**.
18. **Verify address details at checkout**.
19. **Download invoice after purchase**.
20. **Verify Scroll Up/Down functionality**.

---

## 🚀 How to Run the Project

To run this project on your machine, follow these steps:

### Prerequisites
-   Install [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (version 11 or later).
-   Install [Apache Maven](https://maven.apache.org/download.cgi).
-   Install Google Chrome browser.
-   An IDE like [IntelliJ IDEA](https://www.jetbrains.com/idea/) or [Eclipse](https://www.eclipse.org/).

### Running Steps

1.  **Clone the repository:**
    ```bash
    git clone [Your GitHub repository link]
    cd Automationexercise_Selenium
    ```

2.  **Open the project in IntelliJ IDEA:**
    -   From the menu, select `File` -> `Open...`.
    -   Navigate to the cloned folder and select the `pom.xml` file.
    -   Choose `Open as Project`.
    -   IntelliJ IDEA will automatically download all dependencies listed in `pom.xml`.

3.  **Run the Tests:**
    -   You can run all tests at once via the `testng.xml` file (if you have created one).
    -   Alternatively, you can run a specific test class by opening it, right-clicking, and selecting `Run 'TestClassName'`.

---

## 🏛️ Project Structure



