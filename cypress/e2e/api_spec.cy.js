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
    cy.request('POST', apiUrl, newItem).then((res) => {
      const id = res.body._id;

      cy.request('DELETE', `${apiUrl}/${id}`)
        .its('status')
        .should('eq', 204);
    });
  });
});
