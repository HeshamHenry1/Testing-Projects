/// <reference types="Cypress" />
describe('Verify Product quantity in Cart', () => {
    it('Verify Product quantity in Cart', () => {
         cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get(':nth-child(5) > .product-image-wrapper > .choose > .nav > li > a').click();
        cy.get('#quantity').clear();
        cy.get('#quantity').type(4);
        cy.get(':nth-child(5) > .btn').click();
        cy.get('u').click();
        // Get all buttons with the class 'disabled'
         cy.get('.disabled').each(($btn) => {
        // Assert the value inside each button
         cy.wrap($btn).invoke('text').should('eq', '4');
         });
  

        
    });
});