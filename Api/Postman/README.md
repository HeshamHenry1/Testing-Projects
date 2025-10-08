# Postman API Tests & Newman Reports

![Postman & Newman]

This folder contains the Postman collections for testing the [Automation Exercise](https://automationexercise.com/ ) API, along with the necessary environment configurations. We use **Newman** to run these collections from the command line and generate detailed HTML reports.

---

## 📦 What's Inside?

-   **`.json` Collection Files**: Exported Postman collections for different API modules (e.g., `Products`, `Login`, `User Account`).
-   **`.json` Environment File**: Contains environment variables like `baseUrl`.
-   **`/newman` (Generated Folder)**: This folder will contain the HTML test reports after you run the Newman commands.

---

## 🛠️ Prerequisites

Before you begin, ensure you have **Node.js** and **Newman** installed on your system.

1.  **Install Node.js**: Download from [nodejs.org](https://nodejs.org/ ).
2.  **Install Newman & HTML Reporter**: Open your terminal and run the following commands:
    ```bash
    npm install -g newman
    npm install -g newman-reporter-htmlextra
    ```

---

## 🚀 How to Run the Tests

1.  **Open a terminal** or command prompt.

2.  **Navigate to this directory**:
    ```bash
    cd path/to/your/project/Api/Postman
    ```

3.  **Run a collection**: Use the `newman run` command. Specify the collection file, the environment file, and the reporters.

    **Example: Running the "Products" Collection**
    ```bash
    newman run "Products.postman_collection.json" -e "AutomationExercise.postman_environment.json" -r cli,htmlextra
    ```

    **Example: Running the "Login" Collection**
    ```bash
    newman run "Login.postman_collection.json" -e "AutomationExercise.postman_environment.json" -r cli,htmlextra
    ```

---

## 📊 Viewing Reports

After running a command, a new folder named `newman` will be created in this directory. Inside it, you will find a detailed, interactive HTML report for your test run. Open this `.html` file in any web browser to see:

-   A summary of passed and failed tests.
-   Details for each API request (URL, headers, body).
-   Assertions and test script results for each request.
-   Response times and status codes.

This provides a clear and professional overview of the API's health.
