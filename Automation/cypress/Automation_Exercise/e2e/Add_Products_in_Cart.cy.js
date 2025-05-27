/// <reference types="Cypress" />
describe('Add Products in Cart', () => {
    it('Add Products in Cart', () => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        // cy.get('.features_items > :nth-child(3)').trigger('mouseover');
        cy.get('.features_items > :nth-child(3)').invoke('show');
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('.modal-footer > .btn').click();
        cy.get(':nth-child(4) > .product-image-wrapper').trigger('mouseup');
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
        cy.get('u').click();
        
        cy.get('#cart_info_table tbody tr').then(($productRows) => {
            const numberOfProducts = $productRows.length;
            console.log('Number of products in the table:', numberOfProducts);
          });
          
          



    });
});