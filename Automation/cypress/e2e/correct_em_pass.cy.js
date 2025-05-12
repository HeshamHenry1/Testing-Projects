/// <reference types="Cypress" />
describe('log in with correct user and email',()=>{
    it('log in with correct user and email',()=>{
        cy.visit( 'http://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click();
        cy.get('[data-qa="login-email"]').type('heshamhery2@gmail.com');
        cy.get('[data-qa="login-password"]').type('12345678');
        cy.get('[data-qa="login-button"]').click();
        cy.get('b').should('be.visible');
      

    })

})