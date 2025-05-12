/// <reference types="Cypress" />
describe('Place Order: Register before Checkout', () => {
    it('Place Order: Register before Checkout', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
        cy.get('.signup-form > h2').should('be.visible');
        cy.get('[data-qa="signup-name"]').type('test');
        cy.get('[data-qa="signup-email"]').type('test_47@gmail.com');
        cy.get('[data-qa="signup-button"]').click();
        cy.get(':nth-child(1) > b').should('be.visible');
        cy.get('#id_gender1').check();
        cy.get('[data-qa="password"]').type('12345678');
        cy.get('[data-qa="days"]').select('29');
        cy.get('[data-qa="months"').select('September');
        cy.get('[data-qa="years"').select('2001');
        cy.get('#newsletter').click();
        cy.get('#optin').click();
        cy.get('[data-qa="first_name"]').type('test');
        cy.get('[data-qa="last_name"]').type('test2');
        cy.get('[data-qa="company"]').type('test');
        cy.get('[data-qa="address"]').type('test');
        cy.get('[data-qa="address2"]').type('none');
        cy.get('[data-qa="country"]').select('India');
        cy.get('[data-qa="state"]').type('california');
        cy.get('[data-qa="city"]').type('chicago');
        cy.get('[data-qa="zipcode"]').type('093');
        cy.get('[data-qa="mobile_number"]').type('00000011111');
        cy.get('[data-qa="create-account"]').click();
        cy.get('b').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
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