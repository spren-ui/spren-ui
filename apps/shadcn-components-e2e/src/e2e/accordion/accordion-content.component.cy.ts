describe('shadcn-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accordioncontent--primary&args=forceMount:false;class;'));
  it('should render the component', () => {
    cy.get('ui-accordion-content').should('exist');
  });
});
