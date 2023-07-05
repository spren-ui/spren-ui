describe('shadcn-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accordiontrigger--primary'));
  it('should render the component', () => {
    cy.get('ui-accordion-trigger').should('exist');
  });
});
