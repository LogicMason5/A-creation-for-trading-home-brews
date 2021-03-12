/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
import { offer } from '../fixtures/testData'

describe('My offers', () => {

  before(() => {
    cy.clearLocalStorage()
    cy.resetUsers()
    cy.resetOffers()
    cy.createTester()
    cy.loginTester()
    cy.createOffer()
    cy.visit('my-offers')
  })

  it('displays info', () => {
    cy.contains('beer')
    cy.contains('29 days, 23 hours and')
    cy.contains('active')
  })

  describe('action buttons', () => {
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
    it('toggle', () => {
      cy.get(`#toggle${offer.beerName}Switch`).click()
      cy.contains(`Offer for ${offer.beerName} deactivated.`)
      cy.get(`#toggle${offer.beerName}Switch`).click()
      cy.contains(`Offer for ${offer.beerName} activated.`)
      cy.contains(`29 days, 23 hours`)
    })
    //delete last or refactor blocks and before functions blocks
    it('delete', () => {
      cy.get(`#delete${offer.beerName}Button`).click()
      cy.contains('Delete offer for abeer?')
      cy.contains('You can use the active switch to deactivate it instead.')
      cy.get('#offerDialogConfirmButton').click()
      cy.contains(`Offer deleted.`)
      cy.contains('No offers found.')
      cy.contains('create a new offer?')
    })
    it('no in my-offers', () => {
      cy.visit('my-offers')
      cy.contains('No offers found.')
    })
    it('link to create works', () => {
      cy.contains('create a new offer').click()
      cy.url().should('include', '/create-offer')
    })
  })



  describe('edit', () => {
    before(() => {
      cy.resetOffers()
      cy.loginTester()
      cy.createOffer()
    })
    beforeEach(() => {
      cy.loginTester()
      cy.visit('my-offers')
      cy.get(`#edit${offer.beerName}Button`).click()
    })
    it('imports initial data', () => {
      cy.contains(`Editing offer for ${offer.beerName}`)
      cy.checkImportedOfferFormValues()
    })
    it('image is loaded', () => {
      cy.get(`#imageDisplay`)
      .scrollIntoView()
      .should('be.visible')
      //add image comparison with a plugin?
    })
    it('editing and saving work', () => {
      cy.get("#descriptionField")
      .scrollIntoView()
      .clear({force: true})
      .type('new description. new description. new description.', )
      cy.contains('new description. new description. new description.')
      cy.get("#submitOfferButton").click()
      cy.contains(`Offer for ${offer.beerName} updated`)
    })
    it('edits are saved', () => {
      cy.contains('new description. new description. new description.')
    })
  })

  describe('copy', () => {
    before(() => {
      cy.loginTester()
      cy.resetOffers()
      cy.createOffer()
    })
    beforeEach(() => {
      cy.loginTester()
      cy.visit('my-offers')
      cy.get(`#copy${offer.beerName}Button`).click()
    })
    it('confirm dialog shows', () => {
      cy.contains(`Create a copy of the offer for ${offer.beerName}`)
      cy.contains('You will be redirected to edit the details of the new Offer.')
    })
    it('imports initial data', () => {
      cy.contains('Confirm').click()
      cy.contains(`Creating a new offer from a copy of ${offer.beerName}`)
      cy.checkImportedOfferFormValues()
    })
    it('editing and saving work', () => {
      cy.contains('Confirm').click()
      cy.get("#beerNameField")
      .scrollIntoView()
      .clear({force: true})
      .type('newbeername', )
      cy.get("#submitOfferButton").click()
      cy.contains(`Offer for newbeername created!`)
    })
    it('both offers show in my-offers', () => {
      cy.visit('my-offers')
      cy.contains('newbeername')
      cy.contains(offer.beerName)
    })
    it('copied offer has init data', () => {
      cy.visit('my-offers')
      cy.get(`#editnewbeernameButton`).click()
      cy.get("#locationField").should('value', offer.location.asText)
      cy.get("#recipeLinkField").should('value', offer.recipeLink)
      cy.get("#reviewLinkField").should('value', offer.reviewLink)
    })
  })

})



