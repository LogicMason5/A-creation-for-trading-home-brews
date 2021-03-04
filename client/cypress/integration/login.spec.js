/* eslint-disable no-undef */
import { user } from '../fixtures/testData'

describe('Login', () => {
  before(() =>  {
    cy.resetUsers()
    cy.createTester()
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('login')
  })

  it('form is showing', () => {
    cy.contains('Login')
    cy.contains('Email')
    cy.contains('Forgot password?')
    cy.contains('Reset password')
    cy.contains('Not yet registered?')
    cy.contains('Register')
  })

  describe('fails', () => {
    it('locally malformatted email', () => {
      cy.get('#loginEmailField').type('malformatted@email')
      cy.get('#loginPwField').type(user.password)
      cy.get('#loginSubmitButton').click()
      cy.contains('Please provide a valid email')
    })
    it('locally malformatted password', () => {
      cy.get('#loginEmailField').type(user.email)
      cy.get('#loginPwField').type('salainennonum')
      cy.get('#loginSubmitButton').click()
      cy.contains('Password must contain a number to be valid.')
    })
    it('non-existing email', () => {
      cy.get('#loginEmailField').type('wrong@homebrewswap.app')
      cy.get('#loginPwField').type(user.password)
      cy.get('#loginSubmitButton').click()
      cy.contains('Incorrect email')
    })
    it('wrong password', () => {
      cy.get('#loginEmailField').type(user.email)
      cy.get('#loginPwField').type('salainen2')
      cy.get('#loginSubmitButton').click()
      cy.contains('Incorrect password')
    })
  })
  
  describe('succeeds', () => {
    it('and shows welcome message', () => {
      cy.get('#loginEmailField').type(user.email)
      cy.get('#loginPwField').type(user.password)
      cy.get('#loginSubmitButton').click()
      cy.contains(`Welcome ${user.username}`)
    })
  })

  describe('password reset button', () => {
    it('shows form', () => {
      cy.get('#showPwResetFormButton').click()
      cy.contains('Email to reset password')
      cy.contains('send password reset')
    })
  })
})




