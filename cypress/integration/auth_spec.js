describe('Authentication', () => {
  it('confirm visit homepage', () => {
    cy.visit('http://localhost:3000');
    cy.get('.modal').contains('Find a Store');
    let stores = cy.get('#store-modal-list').children('div');
    cy.expect(stores).to.not.be.empty;
    cy.contains('Set as My Store').click();
    let homepage = cy.get('#index-list').children();
    cy.expect(homepage).to.not.be.empty;
  });
  it('confirm login', () => {
    cy.contains('Login').click();
    // cy.contains('Login');
  });
});
