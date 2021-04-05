/* eslint-disable no-undef */
describe('Homepage', () => {

  describe('not logged in',() => {
    before(() => {
      cy.clearLocalStorage()
      cy.visit('/')
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
    describe('appbar navigation',() => {
      it('createoffer button', () => {
        cy.get('#createOfferAppBarButton').click()
        cy.contains('You must be logged in to create an offer')
        cy.contains('Sign in')
        cy.contains('Register')
        cy.url().should('include', '/create-offer')
      })
      it('myaccount appbar button', () => {
        cy.get('#myAccountAppBarButton').click()
        cy.contains('Login')
        cy.contains('Forgot password?')
        cy.contains('Not yet registered?')
        cy.url().should('include','login')
      })
    })
  })
})

