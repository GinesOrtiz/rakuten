describe('Trailer', () => {
  beforeEach(() => {
    cy.visit('/trailer/matrix')
  })

  it('Trailer view', () => {
    cy.get('.return-link', { timeout: 1000 }).as('returnLink')
    cy.get('video').as('player')

    cy.get('@returnLink').should('exist')
    cy.get('@player').should('exist')

    cy.get('@player').should('have.prop', 'src')
    cy.get('@player').should('have.prop', 'autoplay')
    cy.get('@player').should('have.prop', 'controls')
  })
})
