describe('Movie', () => {
  beforeEach(() => {
    cy.visit('/movie/matrix')
  })

  it('Movie view', () => {
    const infoGroup = ['136 minutos', '1999', '5/5', '18', '3,99 €']

    cy.get('.cover .content-title').as('movieTitle')
    cy.get('.cover a.button').as('movieTrailer')
    cy.get('.info-group').as('infoGroup')

    cy.get('@movieTitle').should('contain', 'Matrix')

    cy.get('@movieTrailer').should('contain', 'Ver trailer')
    cy.get('@movieTrailer').should('have.attr', 'href').and('include', '/trailer/matrix')

    infoGroup.forEach((val, group) => {
      cy.get('@infoGroup').eq(group).find('.info-value').should('contain', val)
    })

    cy.get('.detail-section .detail-value').should('contain', 'Neo es el nick')
    cy.get('.detail-stream .detail-column')
      .eq(0)
      .find('p')
      .should('contain', 'Español')
    cy.get('.detail-stream .detail-column')
      .eq(1)
      .find('p')
      .should('contain', 'Español')

    cy.get('.actors-profile').should('have.length', 15)
  })
})
