
describe('Search Product', () => {
    it('Search Product', () => {
        cy.visit('http://automationexercise.com');
        cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
        cy.url().should('include', 'https://automationexercise.com/products');
        cy.get('#search_product').type('Tshirt');
        cy.get('#submit_search').click();

        cy.get('.productinfo>p').each(($el) => {
          const text = $el.text();
        
          if (text.includes('Tshirt') || text.includes('T-Shirt')) {
            cy.log('Product found with name containing "Tshirt" or "T-Shirt"');
          }
        });
        

        

  });
  
  
    });
    
