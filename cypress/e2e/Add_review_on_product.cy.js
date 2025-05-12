/// <reference types="Cypress" />
describe('Add review on product', () => {
    it('Add review on product', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        cy.url().should('eq','https://automationexercise.com/products');
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
        cy.get('.active > a').should('be.visible');
        cy.get('#name').type('test');
        cy.get('#email').type('test_33@gmail.com');
        cy.get('#review').type('test test');
        cy.get('#button-review').click();
        cy.get('.alert-success > span').should('be.visible');
    });
});