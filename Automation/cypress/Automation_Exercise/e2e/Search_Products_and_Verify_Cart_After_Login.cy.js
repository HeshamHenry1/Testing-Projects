/// <reference types="Cypress" />
describe('Search Products and Verify Cart After Login', () => {
    it('Search Products and Verify Cart After Login', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        cy.url().should('eq','https://automationexercise.com/products');
        cy.get('#search_product').type('Tshirt');
        cy.get('#submit_search').click();

        cy.get('.productinfo>p').each(($el) => {
          const text = $el.text();
        
          if (text.includes('Tshirt') || text.includes('T-Shirt')) {
            cy.log('Product found with name containing "Tshirt" or "T-Shirt"');
          }
        });
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
        cy.get('#product-2').should('be.visible');
        cy.get('#product-28').should('be.visible');
        cy.get(':nth-child(4) > a').click();
        cy.get('[data-qa="login-email"]').type('test_33@gmail.com');
        cy.get('[data-qa="login-password"]').type('12345678');
        cy.get('[data-qa="login-button"]').click();
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
        cy.get('#product-2').should('be.visible');
        cy.get('#product-28').should('be.visible');

        
        
    });
});