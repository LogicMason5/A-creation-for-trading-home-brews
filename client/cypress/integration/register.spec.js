/* eslint-disable no-undef */
describe('Register', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/test/resetusers')

    cy.clearLocalStorage()
    cy.visit('http://localhost:3000/register')
  })

  it('form is showing', function() {
    cy.contains('Email')
    cy.contains('Sign in')
    cy.contains('Submit')
    cy.contains('Already registered?')
    cy.contains('Register a new brewer')
  })

  it('fails locally with bad credentials', function() {
    cy.get('#userNameField').type('tes')
    cy.get('#emailField').type('tes@tes')
    cy.get('#pwField').type('salainen')
    cy.get('#pwConfirmField').type('salainen1')
    cy.get('#submitRegister').click()
    cy.contains('Min length')
    cy.contains('a valid email')
    cy.contains('must contain a number')
    cy.contains('Passwords must match')
  })

  it('succeeds with good credentials', function() {
    cy.get('#userNameField').type('tester')
    cy.get('#emailField').type('test@homebrewswap.app')
    cy.get('#pwField').type('salainen1')
    cy.get('#pwConfirmField').type('salainen1')
    cy.get('#submitRegister').click()
    cy.contains('Welcome tester')
  })


})




// const user = {
//   displayName: "tester",
//   email: "test@homebrewswap.app",
//   password: "salainen1"
// }
// cy.request('POST', 'http://localhost:3001/api/users/', user)