# 🌐 WebDriverIO Automation Projects

This folder contains automated test projects using [WebDriverIO (WDIO)](https://webdriver.io/).  
Each project simulates real-world test cases across various domains like e-commerce, banking, and dynamic content validation.

The structure follows best practices, focusing on maintainability, clarity, and modular test design.

---

## 📁 Folder Structure

| Folder                      | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `AutomationExercise-wdio`   | Full UI automation for the AutomationExercise website using WDIO            |
| `Guru99_Banking_WDIO`       | Online banking flows: login, new account, transfer – automated via WDIO     |
| `the-internet-wdio`         | Validation for dynamic UI elements and component behaviors (Herokuapp demo) |

---

## 🧪 Tools & Stack

- **Language:** JavaScript / Node.js  
- **Framework:** WebDriverIO (Mocha or Cucumber, depending on the project)  
- **Assertion Library:** Chai  
- **Reporting:** mochawesome, WDIO HTML Reporter  
- **Design Patterns:** Page Object Model (where applicable)

---

## ▶️ How to Run the Tests

1. **Install dependencies:**

```bash
npm install

2. Run all tests:
npx wdio run wdio.conf.js

3. View HTML Report (if configured):
Open the generated mochawesome-report or wdio-html-report in your browser.

