# 🚀 Playwright Automation Projects

This folder contains automated test projects built using [Playwright](https://playwright.dev/).  
It includes UI and functional test flows for various demo applications, structured using the **Page Object Model (POM)** pattern.

---

## 📁 Folder Structure

| Folder                  | Description                                                  |
|-------------------------|--------------------------------------------------------------|
| `AutomationExercise-POM` | Full UI flow automation with reusable page objects and validations     |
| `ParaBank-POM`           | Modular tests for online banking (login, transfer, loans) using POM     |
| `ParaBank-Basic`         | Basic functional test flows for core features                 |
| `SauceDemo`              | Cart interaction, login scenarios, and UI test coverage       |
| `TheInternet-Herokuapp`  | Dynamic content handling, alerts, and cross-page validation   |

---

## 🧪 Tools & Stack

- **Language:** JavaScript / TypeScript  
- **Framework:** Playwright  
- **Design Pattern:** Page Object Model (POM)  
- **Reporting:** Playwright HTML Reports, mochawesome (in some projects)  

---

## ▶️ How to Run the Tests

1. **Install dependencies:**

```bash
npm install

2. Run all tests:
npx playwright test

3. Run a specific test file:
npx playwright test tests/ParaBank-POM/login.spec.ts


