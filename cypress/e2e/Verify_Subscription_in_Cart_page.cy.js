/// <reference types="Cypress" />
describe('Verify Subscription in Cart page', () => {
    it('Verify Subscription in Cart page', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/'); 
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        cy.get('footer').scrollIntoView()
        cy.get('.single-widget > h2').should('be.visible');
        cy.get('#susbscribe_email').type('test_1@gmail.com');
        cy.get('#subscribe').click();
        cy.get('.alert-success').should('be.visible');

        
    });
});