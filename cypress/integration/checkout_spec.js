describe('Checkout', function () {
  it('confirm checkout flow', function () {
    cy.viewport(1920, 979);

    cy.visit('http://localhost:3000/');

    cy.get('.modal-content > .py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-6', { timeout: 10000 }).click();

    cy.get('.py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-3 > .false', { timeout: 10000 }).click();

    cy.get('.p-0 > .collapse > .navbar-nav > .dropdown:nth-child(3) > .dropdown-toggle', { timeout: 10000 }).click();

    cy.get('.collapse > .navbar-nav > .show > .dropdown-menu > .dropdown-item:nth-child(1)', { timeout: 10000 }).click();

    cy.get('.col-sm-6:nth-child(2) > .border-0 > .bg-white > .row > .col-sm-12 > .float-right', { timeout: 10000 }).click();

    cy.get('.col-sm-6:nth-child(2) > .shadow-sm > a > .card-body > .h5', {
      timeout: 10000
    }).click();

    cy.get('.col-sm-6:nth-child(1) > .border-0 > .bg-white > .row > .col-sm-12 > .float-right', { timeout: 10000 }).click();

    cy.get('.text-sm-left > .d-flex > .pl-2 > a > .border-none', {
      timeout: 10000
    }).click();

    cy.get('.d-flex:nth-child(2) > .col-sm-12 > .w-100 > .col-sm-4 > .form-group > #qtySelect').select('3');

    cy.get('.card > .card-body > .card-body > div > .btn', {
      timeout: 10000
    }).click();

    cy.get('.card-body > .row > .col > .form-group > #username', {
      timeout: 10000
    }).click();

    cy.get('.card-body > .row > .col > .form-group > #username').type('tester00');

    cy.get('.card-body > .row > .col > .form-group > #password').type('testing!12');

    cy.get('.card > .card-body > .row > .col > .btn', {
      timeout: 10000
    }).click();

    cy.visit('http://localhost:3000/checkout');

    cy.get('.card-body > .row:nth-child(2) > .col-sm-12 > .form-group > #street', { timeout: 10000 }).click();

    cy.get('.card-body > .row:nth-child(2) > .col-sm-12 > .form-group > #street').type('259 Riverside Road');

    cy.get('.card-body > .row:nth-child(3) > .col-sm-4 > .form-group > #city').type('Atlanta');

    cy.get('.card-body > .row:nth-child(3) > .col-sm-2 > .form-group > #state').type('GA');

    cy.get('.card-body > .row:nth-child(3) > .col-sm-3 > .form-group > #postalCode').type('30032');

    cy.get('.card-body > .row:nth-child(3) > .col-sm-3 > .form-group > #country').type('USA');

    cy.get('.col-md-8 > form > .mb-2 > .card-body > .float-right', {
      timeout: 10000
    }).click();

    cy.get('.row > .col-sm-8 > .row > .col-sm-11 > #cardNumber', {
      timeout: 10000
    }).click();

    cy.get('.row > .col-sm-8 > .row > .col-sm-11 > #cardNumber').type('4242 4242 4242 4242');

    cy.get('.mb-2 > .card-body > .row > .col-sm-2 > #expiryDate').type('04 / 24');

    cy.get('.mb-2 > .card-body > .row > .col-sm-2 > #cvc').type('242');

    cy.get('.mb-2 > .card-body > .mt-4 > .col-sm-6 > .form-check-label', {
      timeout: 10000
    }).click();

    cy.get('.mb-2 > .card-body > .mt-4 > .col-sm-6 > #sameAsShipping').check('true');

    cy.get('div > form > .mb-2 > .card-body > .btn-primary', {
      timeout: 10000
    }).click();

    cy.get('.col-md-4 > .mb-2 > .card-body > div > .btn', {
      timeout: 10000
    }).click();
    cy.get('Order Placed', { timeout: 10000 }).should('exist');
  });
});
