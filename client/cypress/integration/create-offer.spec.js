/* eslint-disable no-undef */
import { offer } from '../fixtures/testData'

describe('Create offer', () => {

  before(() => {
    cy.resetUsers()
    cy.resetOffers()
    cy.clearLocalStorage()
    cy.createTester()
    cy.loginTester()
    cy.visit('create-offer')
  })


  it('local validation', () => {
    cy.get('#submitOfferButton').click()
    cy.contains('A name is required')
    cy.contains('Required')
    cy.contains('A valid location is necessary to display the offer on the map')
  })

  describe('location field', () => {
    it('gives options', () => {
      cy.get('#locationField').type('Tapiola')
      cy.contains('Tapiolan terveysasema')
      cy.contains('Tapiolan jääpuutarha')
    })

    it('options are clickable', () => {
      cy.contains('jääpuutarha').click()
    })
  })

  describe('saving', () => {
    before(() => {
      cy.resetUsers()
      cy.resetOffers()
      cy.clearLocalStorage()
      cy.createTester()
      cy.loginTester()
      cy.visit('create-offer')
    })

    it('works', () => {
      cy.get('#beerNameField').should('be.visible').type(offer.beerName, { force: true })
      cy.get('#descriptionField').type(offer.description,  { force: true })
      cy.get('#recipeLink').type(offer.recipeLink)
      cy.get('#reviewLink').type(offer.reviewLink)
      cy.get('#locationField').type('Tapiola')
      cy.contains('Tapiolan terveysasema')
      cy.contains('Tapiolan jääpuutarha')
      cy.contains('jääpuutarha').click()
      cy.get('#submitOfferButton').click()
      cy.contains(`Offer for ${offer.beerName} created`)
    })
  })

  describe('image upload', () => {
    before(() => {
      cy.resetUsers()
      cy.resetOffers()
      cy.clearLocalStorage()
      cy.createTester()
      cy.loginTester()
      cy.visit('create-offer')
    })
    
    it('opens widget', () => {
      cy.get('#uploadImageButton').click()
      cy.get('iframe[data-test="uw-iframe"]')
    })
  })



})

