describe('The add city page', () => {
  it('should only be for logged in users', () => {
    cy.login('tony@stark.com', 'tony@1234');
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`);
    cy.contains('ADD CITY').click();
    cy.get('#city').type('Luanda');
    cy.get('#country').type('Angola');
    cy.get('#image').type(
      'https://thumbs.dreamstime.com/b/skyline-capital-city-luanda-luanda-bay-seaside-promenade-highway-afternoon-angola-africa-skyline-capital-119415093.jpg'
    );
    cy.get('#add-city').click();
    cy.visit('/');
    cy.contains('Luanda - Angola');
  });
});
