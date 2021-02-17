describe('Visit Retail Demo', () => {
  it('confirm stores', () => {
    cy.visit('http://localhost:3000');

    cy.get('.modal').contains('Find a Store');
    let stores = cy.get('#store-modal-list').children();
    cy.expect(stores).to.not.be.empty;

    cy.contains('Set as My Store').click();

    let homepage = cy.get('#index-list').children();
    cy.expect(homepage).to.not.be.empty;

    cy.contains('Family Night Favorites');
    cy.contains('Kitchen Essentials');
  });
});
