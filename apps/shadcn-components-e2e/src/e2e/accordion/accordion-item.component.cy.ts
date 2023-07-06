describe('shadcn-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accordionitem--primary&args=class;'));
  it('should render the component', () => {
    cy.get('ui-accordion-item').should('exist');
  });
});
