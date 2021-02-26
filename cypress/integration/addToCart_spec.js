describe('Visit Retail Demo', () => {
  it('confirm homepage', () => {
    cy.visit('http://localhost:3000');
    cy.get('.modal').contains('Find a Store');
    let stores = cy.get('#store-modal-list').children('div');
    cy.expect(stores).to.not.be.empty;

    cy.contains('Set as My Store').click();

    cy.get('.navbar').contains('Grocery').click();
    cy.get('.dropdown-menu').contains('Produce').click();
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/category/1f33d252'
    );

    cy.get('h2').contains('Produce', { timeout: 60000 });
    cy.get('.category-card').children().should('have.length', 2);
    cy.get('.category-card').contains('Fruit').click();
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/category/742db80a'
    );
    cy.get('h2', { timeout: 6000 }).should('include', 'Fruit');

    cy.get('#catalog-items').children().should('have.length.greaterThan', 0);

    cy.get('.btn').contains('Add to Cart').click();

    cy.get('.cart-btn')
      .children('.badge', { timeout: 10000 })
      .should('have.text', '1');

    cy.get('.cart-btn').click();
    cy.location('pathname', { timeout: 60000 }).should('include', '/cart');
  });
});
