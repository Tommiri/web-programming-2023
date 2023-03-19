describe('The cities page', () => {
  it('should show some cities', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Capital Cities');
  });

  it('should open the Login view when clicking Authenticate', () => {
    cy.visit('/');
    cy.contains('AUTHENTICATE').click();
    cy.url().should('include', 'auth');
    cy.contains('SignUp instead?').click();
    cy.get('button').should('not.contain', 'SignUp instead?');
    cy.contains('Login instead?').click();
    cy.get('button').should('not.contain', 'Login instead?');
  });
});
