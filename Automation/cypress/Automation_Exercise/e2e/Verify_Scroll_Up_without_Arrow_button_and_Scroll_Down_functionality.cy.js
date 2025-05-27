/// <reference types="Cypress" />
describe('Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
    it('Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq','https://automationexercise.com/');

        // Scroll down to the bottom of the page
         cy.scrollTo('bottom');

        // Verify if 'SUBSCRIPTION' is visible
        cy.get('.footer-widget > .container > .row > .col-sm-3').should('be.visible');

        // Scroll up to the top of the page
        cy.scrollTo('top');

        // Verify that the page is scrolled up
         cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');

        
    });
});