/* eslint-disable no-undef */
import { user } from '../fixtures/testData'

describe('Register', () => {
  beforeEach(() => {
    cy.resetUsers()
    cy.clearLocalStorage()
    cy.visit('register')
  })

  describe('empty db', () => {
    it('form is showing', () => {
      cy.contains('Email')
      cy.contains('Sign in')
      cy.contains('Submit')
      cy.contains('Already registered?')
      cy.contains('Register a new brewer')
    })
  
    it('fails local validation', () => {
      cy.get('#userNameField').type('te')
      cy.get('#emailField').type('tes@tes')
      cy.get('#pwField').type('salainen')
      cy.get('#pwConfirmField').type('salainen1')
      cy.get('#submitRegister').click()
      cy.contains('Min length')
      cy.contains('a valid email')
      cy.contains('must contain a number')
      cy.contains('Passwords must match')
    })
  
    it('succeeds with good credentials', () => {
      cy.get('#userNameField').type(user.username)
      cy.get('#emailField').type(user.email)
      cy.get('#pwField').type(user.email)
      cy.get('#pwConfirmField').type(user.email)
      cy.get('#submitRegister').click()
      cy.contains('Welcome tester')
    })
  })

  describe('tester in db', () => {
    beforeEach(() => {
      cy.createTester()
    })

    it('fails with duplicate username', () => {
      cy.get('#userNameField').type(user.username)
      cy.get('#emailField').type('tester@testerrr.fo')
      cy.get('#pwField').type(user.password)
      cy.get('#pwConfirmField').type(user.password)
      cy.get('#submitRegister').click()
      cy.contains('is already taken')

    })

    it('fails with duplicate email', () => {
      cy.get('#userNameField').type('testersson')
      cy.get('#emailField').type(user.email)
      cy.get('#pwField').type(user.password)
      cy.get('#pwConfirmField').type(user.password)
      cy.get('#submitRegister').click()
      cy.contains('is already taken')
    })
  })

  it('sign in button works', () => {
    cy.get('#signInLinkButton').click()
    cy.contains('Forgot password?')
    cy.url().should('include', '/login')
  })




})

