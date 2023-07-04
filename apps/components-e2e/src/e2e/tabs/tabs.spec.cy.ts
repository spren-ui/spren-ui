describe('components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=undertestcomponent--primary'));
  it('should render the component', () => {
    cy.get('spren-tabs-test').should('exist');
  });
});
