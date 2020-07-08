describe('Home popular slider', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.popular .actions-steps .steps-button').as('stepsButton')
    cy.get('.popular .content-info > .info-title').as('slideTitle')
    cy.get('.popular .prev').as('slidePrev')
    cy.get('.popular .next').as('slideNext')
  })

  it('Elements exists', () => {
    cy.get('@slideTitle').should('exist')
    cy.get('@slidePrev').should('exist')
    cy.get('@slideNext').should('exist')
  })

  it('Prev slide', () => {
    cy.get('@stepsButton').first().should('have.class', 'active')
    cy.get('@stepsButton').last().should('not.have.class', 'active')

    cy.get('@slidePrev').click()
    cy.get('@stepsButton').first().should('not.have.class', 'active')
    cy.get('@stepsButton').last().should('have.class', 'active')
  })

  it('Next slide', () => {
    cy.get('@stepsButton').first().should('have.class', 'active')
    cy.get('@stepsButton').last().should('not.have.class', 'active')

    cy.get('@slideNext').click()
    cy.get('@stepsButton').first().should('not.have.class', 'active')
    cy.get('@stepsButton').eq(1).should('have.class', 'active')
  })

  it('Move to 5th', () => {
    cy.get('@stepsButton').eq(5).should('exist')

    cy.get('@stepsButton').first().should('have.class', 'active')
    cy.get('@stepsButton').eq(5).should('not.have.class', 'active')

    cy.get('@stepsButton').eq(5).click()
    cy.get('@stepsButton').first().should('not.have.class', 'active')
    cy.get('@stepsButton').eq(5).should('have.class', 'active')
  })
})
