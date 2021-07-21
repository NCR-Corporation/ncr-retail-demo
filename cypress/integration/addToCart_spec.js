describe('Cart', () => {
  it('add to cart', function () {
    cy.viewport(1920, 979);

    cy.visit('/');

    /**
     * Get & Set Site
     */
    cy.get('.modal-title').should('contain', 'Find a Store');

    cy.get('#store-modal-list > :nth-child(1) > :nth-child(3) > button', { timeout: 10000 }).should('contain', 'Set as My Store').click();

    // Confirm store is selected.
    cy.get('.subheader-navbar > div > :nth-child(2) > li > a').should('contain', 'Vickery Creek Market');

    /**
     * Add item to cart from catalog grid
     */
    cy.get('.subheader-navbar > div > :nth-child(1) > li:nth-child(1) > a').should('contain', 'All Items').click();

    cy.title().should('include', 'Catalog');

    cy.get('.main-container > .container > .row > :nth-child(1) > :nth-child(1) > .card-footer').should('contain', 'Add to Cart').click();

    cy.get('.header-main > .container > .row:nth-child(1) > :nth-child(3) > div > :nth-child(2) > a > button > .badge', { timeout: 10000 }).should('contain', '1');

    cy.get('.main-container > .container > .row > :nth-child(1) > :nth-child(1)').click();

    /**
     * Add item to cart from /catalog/[id]
     */
    cy.get('.main-container > .container > nav > .breadcrumb > li').should('have.length.of.at.least', 2);
    cy.get('.card-body > :nth-child(4) > div > :nth-child(2) > :nth-child(3)> button').should('contain', 'Add to Cart').click();

    cy.get('.header-main > .container > .row:nth-child(1) > :nth-child(3) > div > :nth-child(2) > a > button > .badge', { timeout: 10000 }).should('contain', '2');

    /**
     * Go to cart
     */
    cy.get('.header-main > .container > .row:nth-child(1) > :nth-child(3) > div > :nth-child(2) > a > button', { timeout: 10000 }).click();
    cy.title().should('include', 'Cart');

    cy.get('#qtySelect', { timeout: 10000 }).should('contain', 2);

    cy.get('.main-container > .container > :nth-child(2) > :nth-child(2) > div > div> div > div > a').should('contain', 'Checkout');
  });
});
