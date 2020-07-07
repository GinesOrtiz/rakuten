describe('Home Slider', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Elements exists', () => {
    cy.get('.popular .content-info > .info-title').should('exist')
    cy.get('.popular .prev').should('exist')
    cy.get('.popular .next').should('exist')
  })

  it('Prev slide', () => {
    cy.get('.popular .actions-steps .steps-button')
      .first()
      .should('have.class', 'active')
    cy.get('.popular .actions-steps .steps-button')
      .last()
      .should('not.have.class', 'active')

    cy.get('.popular .prev').click()
    cy.get('.popular .actions-steps .steps-button')
      .first()
      .should('not.have.class', 'active')
    cy.get('.popular .actions-steps .steps-button')
      .last()
      .should('have.class', 'active')
  })

  it('Next slide', () => {
    cy.get('.popular .actions-steps .steps-button')
      .first()
      .should('have.class', 'active')
    cy.get('.popular .actions-steps .steps-button')
      .last()
      .should('not.have.class', 'active')

    cy.get('.popular .next').click()
    cy.get('.popular .actions-steps .steps-button')
      .first()
      .should('not.have.class', 'active')
    cy.get('.popular .actions-steps .steps-button')
      .eq(1)
      .should('have.class', 'active')
  })

  it('Move to 5th', () => {
    cy.get('.popular .actions-steps .steps-button').eq(5).should('exist')

    cy.get('.popular .actions-steps .steps-button')
      .first()
      .should('have.class', 'active')
    cy.get('.popular .actions-steps .steps-button')
      .eq(5)
      .should('not.have.class', 'active')

    cy.get('.popular .actions-steps .steps-button').eq(5).click()
    cy.get('.popular .actions-steps .steps-button')
      .first()
      .should('not.have.class', 'active')
    cy.get('.popular .actions-steps .steps-button')
      .eq(5)
      .should('have.class', 'active')
  })
})
