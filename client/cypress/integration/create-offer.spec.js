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


  it('mandatory fields required', () => {
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

  // describe('saving', () => {

  //   before(() => {
  //     cy.resetUsers()
  //     cy.resetOffers()
  //     cy.clearLocalStorage()
  //     cy.createTester()
  //     cy.loginTester()
  //     cy.visit('http://localhost:3000/create-offer')
  //   })

  //   it('works', () => {
  //     Cypress.config('defaultCommandTimeout', 10000);
  //     cy.get("#beerName").type('Testing Saving Offer')
  //     cy.get('#descriptionField').type('Testing Offer Saving. Testing Offer Saving. Testing Offer Saving. Testing Offer Saving. ')
  //     cy.get('#recipeLink').type('www.homebrewswap.app')
  //     cy.get('#submitOfferButton').click()
  //     cy.contains('saved')
  //   })


  // })

  describe('image upload', () => {
    it('opens widget', () => {
      cy.get('#uploadImageButton').click()
      cy.get('iframe[data-test="uw-iframe"]')
    })
  })



  




})

