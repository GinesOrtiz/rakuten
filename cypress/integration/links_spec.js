describe('Links', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.popular .artwork-image .button').as('popularButton')
    cy.get('.collection').first().as('collection')
    cy.get('@collection').find('.media').first().as('collectionMedia')
  })

  it('Link popular slider', () => {
    cy.get('@popularButton').should('exist')
    cy.get('@popularButton').click()
    cy.location('pathname').should('contain', '/movie/')
  })

  it('Link collection slider', () => {
    cy.get('@collection').find('.collection-title').should('not.be.empty')
    cy.get('@collectionMedia').should('exist')
    cy.get('@collectionMedia').click()

    cy.location('pathname').should('contain', '/movie/')
  })

  it('Link movie trailer', () => {
    cy.get('@collection').find('.collection-title').should('not.be.empty')
    cy.get('@collectionMedia').should('exist')
    cy.get('@collectionMedia').click()

    cy.location('pathname').should('contain', '/movie/')

    cy.get('.cover a.button').as('trailerButton')
    cy.get('@trailerButton').should('exist')
    cy.get('@trailerButton').click()

    cy.location('pathname').should('contain', '/trailer/')

    cy.get('.return-link').as('returnLink')
    cy.get('@returnLink').should('exist')
    cy.get('@returnLink').click()

    cy.location('pathname').should('contain', '/movie/')
  })
})
