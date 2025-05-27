# ⚙️ Cypress Automation Projects

This folder contains automation testing projects developed using [Cypress](https://www.cypress.io/).  
Cypress is a modern JavaScript-based end-to-end testing framework designed for web applications with fast, reliable test execution and powerful debugging tools.

---

## 📁 Folder Structure

| Folder                | Description                                             |
|-----------------------|---------------------------------------------------------|
| `Automation_Exercise` | End-to-end UI tests with Cypress, including screenshots and detailed reports |

---

## 🧪 Tools & Stack

- **Framework:** Cypress  
- **Language:** JavaScript  
- **Reporting:** Mochawesome, built-in Cypress Dashboard reports  
- **Features:** Screenshot capture on failures, network request mocking, time-travel debugging  

---

## ▶️ How to Run the Tests

1. **Install dependencies:**

```bash
npm install

2. Open Cypress Test Runner (interactive mode):
npx cypress open

3. Run tests headlessly (CLI mode):
npx cypress run

4. View mochawesome reports:
Reports are generated in the cypress/reports folder (if configured).
