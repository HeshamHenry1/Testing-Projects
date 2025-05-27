/// <reference types="Cypress" />
it('Register User with exisit user',()=>{
    cy.visit('http://automationexercise.com');
    cy.get('.shop-menu > .nav > :nth-child(4)').click();
    cy.get('.signup-form > h2').should('be.visible');
    cy.get('[data-qa="signup-name"]').type('Hesham Henry');
    cy.get('[data-qa="signup-email"]').type('heshamhery2@gmail.com');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('.signup-form > form > p').should('be.visible');
    
})