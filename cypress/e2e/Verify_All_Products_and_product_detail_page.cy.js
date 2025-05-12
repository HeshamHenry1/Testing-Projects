
describe('Verify All Products and product detail page', () => {
    it('Verify All Products and product detail page', () => {
        cy.visit('http://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        cy.url().should('include', 'https://automationexercise.com/products');
        cy.get('.features_items').should('be.visible');
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
        cy.url().should('include','https://automationexercise.com/product_details/1');
        cy.get('.product-information').should('be.visible');
        
    });
});