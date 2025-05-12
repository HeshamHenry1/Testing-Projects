/// <reference types="Cypress" />
describe('View Category Products', () => {
    it('View Category Products', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('#accordian').should('exist');
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click();
        cy.get('#Women > .panel-body > ul > :nth-child(2) > a').click();
        cy.get('.title').should('have.text','Women - Tops Products');
        cy.get(':nth-child(2) > .panel-heading > .panel-title > a').click();
        cy.get('#Men > .panel-body > ul > :nth-child(2) > a').click();
        cy.get('.title').should('contain','Jeans');
        
    });
});