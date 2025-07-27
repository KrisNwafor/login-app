describe('Login and CRUD Flow (Single Test Flow)', () => {
  it('logs in and performs CRUD operations', () => {
    cy.visit('http://localhost:3000');

    // Login
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // ✅ Wait for navigation or content
    cy.contains('Add');

    // Create
    cy.get('input[placeholder="Name"]').type('Chris QA');
    cy.get('input[placeholder="Email"]').type('chris@example.com');
    cy.contains('Add').click();
    cy.get('input[placeholder="Name"]').type('Christopher');
    cy.get('input[placeholder="Email"]').type('chris@phantom.com');
    cy.contains('Add').click();
    cy.contains('Chris QA');
    cy.contains('chris@example.com');

    // Edit
    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .onFirstCall().returns('Chris Updated')
        .onSecondCall().returns('qa_updated@example.com');
    });
    cy.contains('Edit').click();
    cy.contains('Chris Updated');

    //Delete
    cy.contains('Delete').click();
    cy.contains('Chris Updated').should('not.exist');
  });
});
