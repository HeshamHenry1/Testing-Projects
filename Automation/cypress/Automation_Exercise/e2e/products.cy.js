/// <reference types="Cypress" />
it('products button',()=>{
    cy.visit('http://automationexercise.com');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    cy.get('.title').should('be.visible');
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();

   
    
})
