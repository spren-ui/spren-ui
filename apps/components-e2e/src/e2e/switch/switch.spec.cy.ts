describe('components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=undertestcomponent--primary&args=checked;onChange;'));
  it('should render the component', () => {
    cy.get('spren-switch-test').should('exist');
  });
});
