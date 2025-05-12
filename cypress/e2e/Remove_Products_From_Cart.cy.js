/// <reference types="Cypress" />
describe('Remove Products From Cart', () => {
    it('Remove Products From Cart', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
        cy.url().should('eq','https://automationexercise.com/view_cart');
        cy.get('#product-1').should('be.visible');
        cy.get('.cart_quantity_delete').click();
        cy.get('#product-1').should('not.exist');
    });
});