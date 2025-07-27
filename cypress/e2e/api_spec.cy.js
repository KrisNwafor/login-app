describe('API Test - CRUD', () => {
  const apiUrl = 'http://localhost:5000/api/items';
  const newItem = { name: 'Chris', email: 'christophernwafor@gmial.com' };

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
        name: 'Chris New',
        email: 'updated@email.com',
      }).its('body')
        .should('include', { name: 'Chris New', email: 'updated@email.com' });
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
