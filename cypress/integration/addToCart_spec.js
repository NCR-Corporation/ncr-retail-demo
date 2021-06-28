describe('Cart', () => {
  it('add to cart', function () {
    cy.viewport(1920, 979);

    cy.visit('http://localhost:3000/');

    cy.get('.py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-3 > .false', { timeout: 10000 }).click();

    cy.get('.p-0 > .collapse > .navbar-nav > .nav-item > .pl-0').click();

    cy.get('.mb-4:nth-child(1) > .border-0 > .bg-white > .row > .col-sm-12 > .float-right').click();

    cy.get('.mb-4:nth-child(2) > .border-0 > .bg-white > .row > .col-sm-12 > .float-right').click();

    cy.get('.mb-4:nth-child(3) > .border-0 > .bg-white > .row > .col-sm-12 > .float-right').click();

    cy.get('.text-sm-left > .d-flex > .pl-2 > a > .border-none', {}).click();

    cy.get('.d-flex:nth-child(2) > .col-sm-12 > .w-100 > .col-sm-4 > .form-group > #qtySelect', { timeout: 10000 }).select('6');

    cy.get('.d-flex:nth-child(2) > .col-sm-12 > .w-100 > .col-sm-2 > .float-right > .svg-inline--fa').click();

    cy.get('.row > .col-md-8 > .row > .col > .mt-1', {}).click();

    cy.get('.p-0 > .collapse > .navbar-nav > .nav-item > .pl-0', {}).click();

    cy.get('.mb-4:nth-child(2) > .border-0 > .d-flex > .align-self-end > .h5', {
      timeout: 10000
    }).click();

    cy.get('.d-flex > .flex-fill > .col-sm-4 > .form-group > #qtySelect', {
      timeout: 10000
    }).select('5');

    cy.get('.mt-auto > .d-flex > .flex-fill > .col-sm-6 > .false', {}).click();

    cy.get('.text-sm-left > .d-flex > .pl-2 > a > .border-none', {}).click();
  });
});
