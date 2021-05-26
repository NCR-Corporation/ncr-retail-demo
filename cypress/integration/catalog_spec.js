describe('View Catalog', function () {
  it('view categories and catalog', function () {
    cy.viewport(1920, 979);

    cy.visit('http://localhost:3000/');

    cy.get('.py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-6 > .h5', {
      timeout: 10000
    }).click();

    cy.get('.py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-3 > .false', { timeout: 10000 }).click();

    cy.get('.p-0 > .collapse > .navbar-nav > .nav-item > .pl-0', {
      timeout: 10000
    }).click();

    cy.get('.mb-4:nth-child(1) > .border-0 > .d-flex > .align-self-end > .h5', {
      timeout: 10000
    }).click();

    cy.get('.my-4 > .bg-white > .breadcrumb > .breadcrumb-item:nth-child(2) > a', { timeout: 10000 }).click();

    cy.get('.p-0 > .collapse > .navbar-nav > .dropdown:nth-child(3) > .dropdown-toggle', { timeout: 10000 }).click();

    cy.get('.collapse > .navbar-nav > .show > .dropdown-menu > .dropdown-item:nth-child(1)', { timeout: 10000 }).click();

    cy.get('.row > .col-sm-6:nth-child(1) > .shadow-sm > a > .card-body', {
      timeout: 10000
    }).click();

    cy.get('.col-sm-6:nth-child(1) > .border-0 > .d-flex > .align-self-end > .h5', { timeout: 10000 }).click();

    cy.get('.my-4 > .bg-white > .breadcrumb > .breadcrumb-item:nth-child(2) > a', { timeout: 10000 }).click();

    cy.get('.col-sm-6:nth-child(2) > .shadow-sm > a > .card-body > .h5', {
      timeout: 10000
    }).click();

    cy.get('div > #catalog-items > .col-sm-6:nth-child(2) > .border-0 > .d-flex', { timeout: 10000 }).click();
  });
});
