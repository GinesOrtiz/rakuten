describe('Home collection slider', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.collection').first().as('collection')
    cy.get('@collection').find('.collection-title').should('not.be.empty')
  })

  it('Elements exists', () => {
    cy.get('@collection').find('.collection-title').should('exist')
    cy.get('@collection').find('.collection-button.prev').should('not.exist')
    cy.get('@collection').find('.collection-button.next').should('exist')
  })

  it('Next cards', () => {
    cy.get('@collection').find('.next').click()
    cy.get('@collection').find('.prev').should('exist')
    cy.get('@collection')
      .find('.collection-slider')
      .should('have.css', 'transform')
  })

  it('Last & first btns', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('@collection').find('.next').click()
    }

    cy.get('@collection').first().find('.prev').should('exist')
    cy.get('@collection').first().find('.next').should('not.exist')

    for (let i = 0; i < 3; i++) {
      cy.get('@collection').first().find('.prev').click()
    }

    cy.get('@collection').first().find('.next').should('exist')
    cy.get('@collection').first().find('.prev').should('not.exist')
  })
})
