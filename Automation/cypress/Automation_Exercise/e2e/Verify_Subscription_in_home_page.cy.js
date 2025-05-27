/// <reference types="Cypress" />
describe('Verify Subscription in home page', () => {
    it('Verify Subscription in home page', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/'); 
        cy.get('footer').scrollIntoView()
        cy.get('.single-widget > h2').should('be.visible');
        cy.get('#susbscribe_email').type('test_1@gmail.com');
        cy.get('#subscribe').click();
        cy.get('.alert-success').should('be.visible');

    });
});