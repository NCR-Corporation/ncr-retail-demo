describe('Authentication', function () {
  it('login to application', function () {
    cy.viewport(1920, 979);

    cy.visit('http://localhost:3000/');

    cy.get('.modal-content > .py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-6', { timeout: 10000 }).click();

    cy.get('.py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-3 > .false', { timeout: 10000 }).click();

    cy.get('.d-flex > .pr-4 > .d-inline-block > .text-light > span:nth-child(2)', { timeout: 10000 }).click();

    cy.get('.card-body > .row > .col > .form-group > #username', { timeout: 10000 }).click();

    cy.get('.card-body > .row > .col > .form-group > #username').type('tester00');

    cy.get('.card-body > .row > .col > .form-group > #password').type('testing!12');

    cy.get('.card > .card-body > .row > .col > .btn', { timeout: 10000 }).click();

    cy.visit('http://localhost:3000/');
    cy.contains('Bruce').should('exist');

    cy.get('.pr-4 > .d-inline-block > .nav > .dropdown > .text-white', { timeout: 10000 }).click();

    cy.get('.d-inline-block > .nav > .dropdown > .dropdown-menu > .dropdown-item:nth-child(1)', { timeout: 10000 }).click();
    cy.get('#username', { timeout: 10000 }).invoke('val').should('contain', 'tester00');
  });
});
