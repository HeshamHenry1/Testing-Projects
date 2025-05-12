/// <reference types="Cypress" />
it('contact us',()=>{
    cy.visit('http://automationexercise.com');
    cy.get('.shop-menu > .nav > :nth-child(8) > a').click();
    cy.get('div.contact-form > .title').should('be.visible');
    cy.get('[data-qa="name"]').type('test');
    cy.get('[data-qa="email"]').type('test_60@gmail.com');
    cy.get('[data-qa="subject"]').type('test');
    cy.get('[data-qa="message"]').type('test test');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/New folder/javascript.png');
    cy.get('[data-qa="submit-button"]').click();
    cy.get('#form-section > .btn').click();


    
})