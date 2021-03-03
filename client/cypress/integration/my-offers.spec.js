/* eslint-disable no-undef */
describe('My offers', () => {

  const beername = 'abeer' //dont use spaces in name

  before(() => {
    cy.resetUsers()
    cy.resetOffers()
    cy.clearLocalStorage()
    cy.createTester()
    cy.loginTester()
    cy.createOffer(beername)
    cy.visit('http://localhost:3000/my-offers')
  })

  it('displays info', () => {
    cy.contains('beer')
    cy.contains('13 days, 23 hours and')
    cy.contains('active')
  })

  describe('action buttons', () => {
    beforeEach(() => {
      cy.loginTester()
      cy.visit('http://localhost:3000/my-offers')
    })

    it('edit', () => {
      cy.get(`#edit${beername}Button`).click()
      cy.url().should('include', '/my-offers/edit/')
      cy.contains('Editing offer for')
      cy.contains('The level of detail is up to you')
      cy.contains(beername)
      cy.contains('save')
      cy.contains('Link to recipe/brewing notes')
    })

    it('copy', () => {
      cy.get(`#copy${beername}Button`).click()
      cy.contains('You will be redirected to edit the details of the new Offer.')
      cy.get('#offerDialogConfirmButton').click()
      cy.url().should('include', '/my-offers/copy/')
      cy.contains(`Creating a new offer from a copy of ${beername}`)
    })
    it('delete', () => {
      cy.get(`#delete${beername}Button`).click()
      cy.contains('Delete offer for abeer?')
      cy.contains('You can use the active switch to deactivate it instead.')
      cy.get('#offerDialogConfirmButton').click()
      cy.contains(`Offer deleted.`)
    })
  })




 



})

