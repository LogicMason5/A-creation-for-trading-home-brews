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
      cy.get('#locationField', { timeout: 15000 }).type('Tapiola')
      cy.contains('Tapiolan terveysasema', { timeout: 15000 })
      cy.contains('Tapiolan jääpuutarha', { timeout: 15000 })
    })
    it('options are clickable', () => {
      cy.contains('jääpuutarha', { timeout: 15000 }).click()
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
      cy.get('#beerNameField').should('be.visible').type(offer.beerName, { force: true, timeout: 15000 })
      cy.get('#descriptionField', { timeout: 15000 }).type(offer.description,  { force: true, timeout: 15000 })
      cy.get('#recipeLinkField', { timeout: 15000 }).type(offer.recipeLink)
      cy.get('#reviewLinkField', { timeout: 15000 }).type(offer.reviewLink)
      cy.get('#locationField', { timeout: 15000 }).type('Tapiola')
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

