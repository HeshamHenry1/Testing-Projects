/// <reference types="Cypress" />
describe('Place Order: Login before Checkout', () => {
    it('Place Order: Login before Checkout', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get('.login-form > h2').should('be.visible');
        cy.get('[data-qa="login-email"]').type('test_47@gmail.com');
        cy.get('[data-qa="login-password"]').type('12345678');
        cy.get('[data-qa="login-button"]').click();
        cy.get('b').should('have.text','test');
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
        cy.get('.col-sm-6 > .btn').click();
        cy.get('#address_delivery').should('be.visible');
        cy.get('.form-control').type('description');
        cy.get(':nth-child(7) > .btn').click();
        cy.get('[data-qa="name-on-card"]').type('test');
        cy.get('[data-qa="card-number"]').type('000000');
        cy.get('[data-qa="cvc"]').type('000');
        cy.get('[data-qa="expiry-month"]').type('000');
        cy.get('[data-qa="expiry-year"]').type('000');
        cy.get('[data-qa="pay-button"]').click();
        cy.get('.col-sm-9 > p').should('be.visible');
    });
});