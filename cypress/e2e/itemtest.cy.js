import { wait } from "@testing-library/user-event/dist/utils";

describe('Login and CRUD Flow (Single Test Flow)', () => {
  it('logs in and performs CRUD operations', () => {
    cy.visit('http://localhost:3000');

    // Login
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for navigation or content
    cy.contains('Add');

    // Create
    cy.get('input[placeholder="Name"]').type('Chris QA');
    cy.get('input[placeholder="Email"]').type('chris@example.com');
    cy.contains('Add').click();
    cy.get('input[placeholder="Name"]').type('Christopher');
    cy.get('input[placeholder="Email"]').type('chris@phantom.com');
    cy.contains('Add').click();
    cy.contains('git --Chris QA');
    cy.contains('chris@example.com');
    wait(2000); // Wait for the prompt to be ready

    // Edit
    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .onFirstCall().returns('Chris Updated')
        .onSecondCall().returns('qa_updated@example.com');
        wait(2000); // Wait for the prompt to be ready
    });
    cy.contains('Edit').click();
    cy.contains('Chris Updated');

    //Delete
    cy.contains('Delete').click();
    cy.contains('Chris Updated').should('not.exist');
  });
});



//backend API test
describe('API Test - CRUD', () => {
  const apiUrl = 'http://localhost:5000/api/items';
  const newItem = { name: 'QA Tester', email: 'qa@example.com' };

  it('should create a new item', () => {
    cy.request('POST', apiUrl, newItem)
      .its('body')
      .should('include', newItem);
  });

  it('should get all items', () => {
    cy.request(apiUrl)
      .its('status')
      .should('eq', 200);
  });

  it('should update an item', () => {
    // First, create an item
    cy.request('POST', apiUrl, newItem).then((res) => {
      const id = res.body._id;

      cy.request('PUT', `${apiUrl}/${id}`, {
        name: 'Updated QA',
        email: 'updated@example.com',
      }).its('body')
        .should('include', { name: 'Updated QA', email: 'updated@example.com' });
    });
  });

  it('should delete an item', () => {
    // First, create an item
    cy.request('POST', apiUrl, newItem).then((res) => {
      const id = res.body._id;

      cy.request('DELETE', `${apiUrl}/${id}`)
        .its('status')
        .should('eq', 204);
    });
  });
});