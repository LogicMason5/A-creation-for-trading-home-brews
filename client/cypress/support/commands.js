/* eslint-disable no-undef */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const user = {
  username: "tester",
  password: "salainen1",
  email: "test@homebrewswap.app"
}

const login = {
  email: "test@homebrewswap.app",
  password: "salainen1"
}

Cypress.Commands.add("createTester", () => {
 cy.request('POST', 'http://localhost:3001/api/user/register', user)
})

Cypress.Commands.add("loginTester", () => {
  cy.request('POST', 'http://localhost:3001/api/user/login', login).then((res) => {
    localStorage.setItem('curUser', JSON.stringify(res.body))
  })
  
})


