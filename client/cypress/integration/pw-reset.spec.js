/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
import { user, apiUrl, offer } from '../fixtures/testData'

describe('Request pw reset email', () => {
  before(() =>  {
    cy.resetUsers()
    cy.createTester()
    cy.visit('login')
  })

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('login')
    cy.get('#showPwResetFormButton').click()
  })

  describe('fails', () => {
    it('with non-existing email', () => {
      cy.get('#resetPwEmailField').type('no@homebrewswapp.app')
      cy.get('#sendPwResetReqButton').click()
      cy.contains('Failed to send reset email:')
    })
  })

  describe('succeeds', () => {
    it('with confirmation', () => {
      cy.get('#resetPwEmailField').type(user.email)
      cy.get('#sendPwResetReqButton').click()
      cy.contains(`Password reset email sent to ${user.email}`)
    })
  })
})

describe('reset', () => {
  before(() =>  {
    cy.resetUsers()
    cy.createTester()
  })
  beforeEach(() => {
    cy.getResetToken().its('body.token').then(token => {
      cy.visit(`resetpw/${token.token}`)
   })
  })
  it('url works', () => {
    cy.contains('Reset password')
    cy.contains('Confirm new password')
  })
  it('fails with local validation', () => {
    cy.get('#resetPwNewPwField').type(`${user.password}New`)
    cy.get('#resetPwConfirmPwField').type(`${user.password}Fail`)
    cy.get('#resetPwSubmitButton').click()
    cy.contains('Passwords must match')
  })
  it('succeeds with confirmation and logs user in',() => {
    cy.get('#resetPwNewPwField').type(`${user.password}New`)
    cy.get('#resetPwConfirmPwField').type(`${user.password}New`)
    cy.get('#resetPwSubmitButton').click()
    cy.contains(`Welcome ${user.username}! Email confirmation about password reset sent.`)
    cy.visit('create-offer')
    cy.contains('Create a new offer')
    cy.contains('A few words about your brew')
    cy.contains('Package Size')
    cy.contains('Give a default trade location')
    cy.contains('Link to recipe/brewing notes')
    cy.contains('Upload an image')
  })
})

describe('reset token', () => {
  before(() =>  {
    cy.resetUsers()
    cy.createTester()
  })
  it('is one time use', () => {
    cy.getResetToken().its('body.token').then(token => {
        cy.visit(`resetpw/${token.token}`)
        cy.get('#resetPwNewPwField').type(`${user.password}New`)
        cy.get('#resetPwConfirmPwField').type(`${user.password}New`)
        cy.get('#resetPwSubmitButton').click()
        cy.visit(`resetpw/${token.token}`)
        cy.get('#resetPwNewPwField').type(`${user.password}New`)
        cy.get('#resetPwConfirmPwField').type(`${user.password}New`)
        cy.get('#resetPwSubmitButton').click()
        cy.contains('Failed to reset password. Please request a new link.')

    })
  })
  it('doesnt auth to create offer', () => {
    cy.requestWithResetToken({
      url: `${apiUrl}offers`,
      method: 'POST',
      body: offer,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.equal(401)
    })
  })
  
})





