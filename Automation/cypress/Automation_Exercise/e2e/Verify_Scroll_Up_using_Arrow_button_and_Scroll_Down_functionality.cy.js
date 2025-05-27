/// <reference types="Cypress" />
describe('Verify Scroll Up using Arrow button and Scroll Down functionality', () => {
    it('Verify Scroll Up using Arrow button and Scroll Down functionality', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq','https://automationexercise.com/');

        cy.scrollTo('bottom');

        cy.get('.footer-widget > .container > .row > .col-sm-3').should('be.visible');

       cy.get('#scrollUp > .fa').click();

        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
    });
});