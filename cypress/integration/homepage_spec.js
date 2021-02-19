describe('Visit Retail Demo', () => {
  it('confirm homepage', () => {
    cy.visit('http://localhost:3000');
    cy.get('.modal').contains('Find a Store');
    let stores = cy.get('#store-modal-list').children('div');
    console.log(stores);
    cy.expect(stores).to.not.be.empty;

    cy.contains('Set as My Store').click();

    let homepage = cy.get('#index-list').children();
    cy.expect(homepage).to.not.be.empty;

    cy.contains('Family Night Favorites').should('exist');
    cy.contains('Kitchen Essentials').should('exist');

    // Confirm all the elements on the page.
    cy.contains('Manage').should('exist');
    cy.contains('Login').should('exist');
    cy.contains('API Requests').should('exist');
  });
});
