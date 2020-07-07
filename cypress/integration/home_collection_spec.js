describe('Home Slider', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Elements exists', () => {
    cy.get('.collection .collection-title').should('exist')
    cy.get('.collection .collection-button.prev').should('not.exist')
    cy.get('.collection .collection-button.next').should('exist')
  })

  it('Next cards', () => {
    cy.get('.collection').first().find('.next').click()
    cy.get('.collection').first().find('.prev').should('exist')
    cy.get('.collection')
      .first()
      .find('.collection-slider')
      .should('have.css', 'transform')
  })

  it('Last & first btns', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('.collection').first().find('.next').click()
    }
    cy.get('.collection').first().find('.prev').should('exist')
    cy.get('.collection').first().find('.next').should('not.exist')

    for (let i = 0; i < 3; i++) {
      cy.get('.collection').first().find('.prev').click()
    }
    cy.get('.collection').first().find('.next').should('exist')
    cy.get('.collection').first().find('.prev').should('not.exist')
  })
})
