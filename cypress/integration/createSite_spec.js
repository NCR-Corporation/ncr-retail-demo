describe('Create Site', function () {
  it('Create a Test Site', function () {
    cy.viewport(1920, 979);

    cy.visit('http://localhost:3000/');

    cy.get('.modal-dialog > .modal-content > .py-0 > #store-modal-list > .py-4:nth-child(2)').click();

    cy.get('.py-0 > #store-modal-list > .py-4:nth-child(1) > .col-sm-3 > .false').click();

    cy.get('.header-top > .container > .d-flex > .nav-item > .nav-link').click();

    cy.visit('http://localhost:3000/admin/dashboard');

    cy.get('.container > .p-0 > .admin-nav > .nav-item:nth-child(3) > .nav-link').click();

    cy.get('div > .w-75 > div > .text-right > .btn').click();

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #referenceId').click();

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #referenceId').type('1-100');

    cy.get('.col-md-8 > .mb-2 > .card-body > .form-group > #siteName').type('Test Site');

    cy.get('.col-md-8 > .mb-2 > .card-body > .form-group > #street').click();

    cy.get('.col-md-8 > .mb-2 > .card-body > .form-group > #street').type('400 Park Dr. NE');

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #city').type('Atlanta');

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #state').type('GA');

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #postalCode').type('30308');

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #country').type('USA');

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #latitude').click();

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #latitude').type('33.7767488');

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #longitude').click();

    cy.get('.mb-2 > .card-body > .form-row > .form-group > #longitude').type('-84.3907724');

    cy.get('.col-md-4 > .card > .card-body > .form-group > .null').click();

    cy.get('.col-md-4 > .card > .card-body > .form-group > .null').select('ACTIVE');

    cy.get('.col-md-4 > .card > .card-body > .form-group > .null').click();

    cy.get('form > .row > .col > .form-group > .btn').click();

    cy.get('.container > .p-0 > .admin-nav > .nav-item:nth-child(3) > .nav-link').click();

    cy.get('tr:nth-child(1) > td > .row > .text-center > a > .fa-edit > path').click();

    cy.get('.col-md-4 > .card > .card-body > .form-group > .null').click();

    cy.get('.col-md-4 > .card > .card-body > .form-group > .null').select('INACTIVE');

    cy.get('.col-md-4 > .card > .card-body > .form-group > .null').click();

    cy.get('form > .row > .col > .form-group > .btn').click();

    cy.get('.container > .p-0 > .admin-nav > .nav-item:nth-child(3) > .nav-link').click();
  });
});
