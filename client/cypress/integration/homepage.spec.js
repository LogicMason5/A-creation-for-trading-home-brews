/* eslint-disable no-undef */
describe('Homepage', () => {

  describe('not logged in',() => {
    before(() => {
      cy.clearLocalStorage()
      cy.visit('http://localhost:3000/')
    })
    describe('is showing', () => {
      it('appbar', () => {
        cy.contains('Homebrew Swap')
      })
  
      it('map', () => {
        cy.contains('Google')
        cy.contains('Map data')
      })
    })

    describe('cookies bar', () => {
      it('is showing', () => {
        cy.contains('This website needs')
      })
  
      it('on click', () => {
        cy.get('#acceptButton').click()
      })

    })




  })

  describe('is logged in', () => {
    before(() => {
      cy.request('POST', 'http://localhost:3001/api/test/resetusers')
      cy.clearLocalStorage()
      cy.createTester()
      cy.loginTester()
      cy.visit('http://localhost:3000/')
    })

    describe('appbar navigation',() => {
      it('createoffer button', () => {
        cy.get('#createOfferAppBarButton').click()
        cy.contains('Create a new offer')
        cy.contains('A few words about your brew')
        cy.contains('Package Size')
        cy.contains('Trade location')
        cy.contains('Link to recipe/brewing notes')
        cy.contains('Upload an image')
        cy.url().should('include', '/create-offer')
      })
      it('myaccount appbar button', () => {
        cy.get('#myAccountAppBarButton').click()
        cy.contains('My offers')
        cy.contains('Edit account')
        cy.contains('Log out')
        cy.url().should('include','my-account')
      })
    })
  })
})

