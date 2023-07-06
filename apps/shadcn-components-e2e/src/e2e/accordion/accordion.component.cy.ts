describe('shadcn-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accordion--primary'));
  it('should render the component', () => {
    cy.get('ui-accordion').should('exist');
  });
});
