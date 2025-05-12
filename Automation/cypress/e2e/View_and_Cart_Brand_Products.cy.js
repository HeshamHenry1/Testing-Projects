/// <reference types="Cypress" />
describe('View & Cart Brand Products', () => {
    it('View & Cart Brand Products', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        cy.get('.brands-name').should('be.visible');
        cy.get('.brands-name > .nav > :nth-child(1) > a').click();
        cy.get('.title').should('contain','Brand - Polo Products');
        cy.get('.brands-name > .nav > :nth-child(2) > a').click();
        cy.get('.title').should('contain','Brand - H&M Products');

    });
});