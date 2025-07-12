# Sauce Labs Demo Automation Project (Selenium & TestNG)

This project is a test automation framework built to test the functionality of the [Sauce Labs Demo](https://www.saucedemo.com/ ) e-commerce website. It is developed using Java, Selenium, and TestNG.

## Key Features

*   **Page Object Model (POM):** The project follows the POM design pattern to create a scalable and maintainable test framework. Each page on the website is represented by a corresponding Java class.
*   **TestNG Framework:** Used for structuring and running the tests, with support for annotations, assertions, and test grouping.
*   **Selenium WebDriver:** Powers the browser automation to simulate user interactions.
*   **Maven:** Used for project and dependency management.

## Tests Covered

This framework includes test cases for critical user flows, such as:
- Successful and failed user logins.
- Adding products to the shopping cart.
- Removing products from the cart.
- Completing the checkout process.

## How to Run the Tests

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HeshamHenry1/Testing-Projects.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Testing-Projects/Automation/selenium/Selenium_SauceDemo
    ```
3.  **Run the tests using Maven:**
    ```bash
    mvn clean test
    ```

## Technologies Used

*   **Language:** Java
*   **Automation Tool:** Selenium
*   **Test Runner:** TestNG
*   **Build Tool:** Maven
