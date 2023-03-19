describe('The auth page', () => {
  it('should log in a user with valid credentials', () => {
    cy.login('tony@stark.com', 'tony@1234');
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`);
  });
});
