/// <reference types="Cypress" />
describe('Logot', () => {
    it('Login User with correct email and password and logout ' , () => {
        cy.visit('http://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get('.login-form > h2').should('be.visible');
        cy.get('[data-qa="login-email"]').type('test_3@gmail.com');
        cy.get('[data-qa="login-password"]').type('12345678');
        cy.get('[data-qa="login-button"]').click();
        cy.get('b').should('have.text','test');
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
        cy.url().should('include', 'https://automationexercise.com/login');

        
    });
    
});