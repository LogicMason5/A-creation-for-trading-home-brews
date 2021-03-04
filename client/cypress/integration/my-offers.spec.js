/* eslint-disable no-undef */
import { offer } from '../fixtures/testData'

describe('My offers', () => {

  before(() => {
    cy.resetUsers()
    cy.resetOffers()
    cy.clearLocalStorage()
    cy.createTester()
    cy.loginTester()
    cy.createOffer()
    cy.visit('my-offers')
  })

  it('displays info', () => {
    cy.contains('beer')
    cy.contains('13 days, 23 hours and')
    cy.contains('active')
  })

  describe('action buttons navigate to', () => {
    beforeEach(() => {
      cy.loginTester()
      cy.visit('my-offers')
    })
    it('edit', () => {
      cy.get(`#edit${offer.beerName}Button`).click()
      cy.url().should('include', '/my-offers/edit/')
      cy.contains('Editing offer for')
      cy.contains('The level of detail is up to you')
      cy.contains(offer.beerName)
      cy.contains('save')
      cy.contains('Link to recipe/brewing notes')
    })
    it('copy', () => {
      cy.get(`#copy${offer.beerName}Button`).click()
      cy.contains('You will be redirected to edit the details of the new Offer.')
      cy.get('#offerDialogConfirmButton').click()
      cy.url().should('include', '/my-offers/copy/')
      cy.contains(`Creating a new offer from a copy of ${offer.beerName}`)
    })
    it('delete', () => {
      cy.get(`#delete${offer.beerName}Button`).click()
      cy.contains('Delete offer for abeer?')
      cy.contains('You can use the active switch to deactivate it instead.')
      cy.get('#offerDialogConfirmButton').click()
      cy.contains(`Offer deleted.`)
    })
  })

})

