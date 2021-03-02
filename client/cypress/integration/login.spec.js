/* eslint-disable no-undef */
describe('Login', () => {
  before(() =>  {
    cy.request('POST', 'http://localhost:3001/api/test/resetusers')
    cy.createTester()
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000/login')
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
      cy.get('#loginPwField').type('salainen1')
      cy.get('#loginSubmitButton').click()
      cy.contains('Please provide a valid email')
    })
    it('locally malformatted password', () => {
      cy.get('#loginEmailField').type('test@homebrewswap.app')
      cy.get('#loginPwField').type('salainennonum')
      cy.get('#loginSubmitButton').click()
      cy.contains('Password must contain a number to be valid.')
    })
    it('non-existing email', () => {
      cy.get('#loginEmailField').type('wrong@homebrewswap.app')
      cy.get('#loginPwField').type('salainen1')
      cy.get('#loginSubmitButton').click()
      cy.contains('Incorrect email')
    })
    it('wrong password', () => {
      cy.get('#loginEmailField').type('test@homebrewswap.app')
      cy.get('#loginPwField').type('salainen2')
      cy.get('#loginSubmitButton').click()
      cy.contains('Incorrect password')
    })
  })

})

