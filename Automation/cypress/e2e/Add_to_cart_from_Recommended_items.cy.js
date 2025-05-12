/// <reference types="Cypress" />
describe('Add to cart from Recommended items', () => {
    it('Add to cart from Recommended items', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.recommended_items > .title').scrollIntoView();
        cy.get('.recommended_items > .title').should('be.visible');
        cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('u').click();
        cy.get('#cart_info').should('exist');
    });
});