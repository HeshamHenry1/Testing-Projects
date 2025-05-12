/// <reference types="Cypress" />
describe('Verify Test Cases Page', () => {
    it('Verify Test Cases Page', () => {
        cy.visit('http://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
        cy.url().should('include', 'https://automationexercise.com/test_cases');
    });
});