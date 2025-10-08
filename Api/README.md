# API Testing for Automation Exercise

![API Testing]

This directory contains all resources related to the API testing of the [Automation Exercise](https://automationexercise.com/ ) application. The goal is to ensure the backend services are stable, reliable, and function as expected.

We employ two powerful approaches for API testing:
1.  **Postman**: For exploratory testing, collection management, and automated runs via Newman.
2.  **Rest-Assured**: For building robust, scalable, and maintainable API test automation frameworks in Java.

---

## 📂 Directory Structure

| Directory | Description |
| :--- | :--- |
| 📁 **[Postman](./Postman/)** | Contains Postman collections, environment files, and generated Newman reports. |
| 📁 **[RestAssured](./RestAssured/)** | Contains the Java-based Rest-Assured test automation framework. |

---

## 🛠️ Tools & Technologies

-   **Postman**: For creating and managing API test collections.
-   **Newman**: For running Postman collections from the command line and generating reports.
-   **Rest-Assured**: A Java library for powerful and readable API test automation.
-   **TestNG**: Test runner for organizing and executing Rest-Assured tests.
-   **Maven**: For project build and dependency management.

---

## 🚀 How to Run

### Postman & Newman

1.  Navigate to the `Postman` directory.
2.  Follow the instructions in the `Postman/README.md` file to run the collections and generate HTML reports.

### Rest-Assured

1.  Open the `RestAssured` project in your favorite Java IDE (e.g., IntelliJ IDEA, Eclipse).
2.  Build the project using Maven to download all dependencies.
3.  Run the tests using the TestNG integration in your IDE or via the command line:
    ```bash
    mvn clean test
    ```

---

## 🎯 Test Scope

-   **User Management**: Create, Update, Delete, and Retrieve user accounts.
-   **Product APIs**: List all products, search for products.
-   **Brand APIs**: List all brands.
-   **Authentication**: Verify user login with valid and invalid credentials.
-   **Negative Testing**: Validate API responses for invalid inputs and unsupported methods.
