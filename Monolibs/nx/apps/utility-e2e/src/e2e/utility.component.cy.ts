describe('utility', () => {
  beforeEach(() => cy.visit('/iframe.html?id=utilitycomponent--primary'));
  it('should render the component', () => {
    cy.get('lib-utility').should('exist');
  });
});
