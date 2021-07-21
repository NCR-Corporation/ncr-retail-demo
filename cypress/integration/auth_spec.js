describe('Authentication', function () {
  it('login to application', function () {
    cy.viewport(1920, 979);

    cy.visit('/');
    cy.get('.modal-title').should('contain', 'Find a Store');
    cy.get('#store-modal-list > :nth-child(1) > :nth-child(3) > button', { timeout: 10000 }).should('contain', 'Set as My Store').click();

    cy.get('.header-main > .container > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(1) > div > button').should('contain', 'Signup / Login').click();

    cy.get('.card-body > .row > .col > .form-group > #username', { timeout: 10000 }).click();

    cy.get('.card-body > .row > .col > .form-group > #username').type('tester00');

    cy.get('.card-body > .row > .col > .form-group > #password').type('testing!12');

    cy.get('.card > .card-body > .row > .col > .btn', { timeout: 10000 }).click();

    cy.visit('/');
    cy.contains('Bruce').should('exist');
    cy.get('.nav > .dropdown > a').click();
    cy.get('.nav > .dropdown > .dropdown-menu > button:nth-child(1)').should('contain', 'Profile').click();
    cy.get('#username', { timeout: 10000 }).invoke('val').should('contain', 'tester00');
  });
});
