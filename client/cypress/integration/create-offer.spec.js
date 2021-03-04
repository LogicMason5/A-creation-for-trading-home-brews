/* eslint-disable no-undef */
describe('Create offer', () => {

  before(() => {
    cy.resetUsers()
    cy.resetOffers()
    cy.clearLocalStorage()
    cy.createTester()
    cy.loginTester()
    cy.visit('http://localhost:3000/create-offer')
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
      cy.visit('http://localhost:3000/create-offer')
    })

    it('works', () => {

      
      cy.get('#beerName').should('be.visible').type('Testing', { force: true })
      cy.get('#descriptionField').type('Saving.',  { force: true })
      cy.get('#recipeLink').type('www.homebrewswap.app')

      cy.get('#locationField').type('Tapiola')
      cy.contains('Tapiolan terveysasema')
      cy.contains('Tapiolan jääpuutarha')
      cy.contains('jääpuutarha').click()

      cy.get('#submitOfferButton').click()
      cy.contains('Offer for Testing created')
    })
  })

  describe('image upload', () => {
    before(() => {
      cy.resetUsers()
      cy.resetOffers()
      cy.clearLocalStorage()
      cy.createTester()
      cy.loginTester()
      cy.visit('http://localhost:3000/create-offer')
    })
    
    it('opens widget', () => {
      cy.get('#uploadImageButton').click()
      cy.get('iframe[data-test="uw-iframe"]')
    })
  })



})

