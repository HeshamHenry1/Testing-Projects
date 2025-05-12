/// <reference types="Cypress" />
it('Register User',()=>{
    cy.visit('http://automationexercise.com');
    cy.get('.shop-menu > .nav > :nth-child(4)').click();
    
})
