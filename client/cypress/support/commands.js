/* eslint-disable no-undef */
import { createAuthHeaders } from '../../src/utils/createHeaders'

const user = {
  username: "tester",
  password: "salainen1",
  email: "test@homebrewswap.app"
}

const login = {
  email: "test@homebrewswap.app",
  password: "salainen1"
}

const offerWithoutName = {
  beerName: "abeer", //dont use spaces for id
  description: "this is a beer. this is a beer. this is a beer. this is a beer. ",
  packageSize: "0.33",
  amount: 6,
  location: {
    lat: 60.1785679,
    lng: 24.7980908,
    asText: "Tapiolan terveysasema, Ahertajantie, Espoo, Suomi"
  },
  recipeLink: "this.is.link",
  imgUrl: "https://res.cloudinary.com/www-homebrewswap-app/image/upload/v1614284065/sad_bottle_crcqob.jpg",
  active: true
}

Cypress.Commands.add('createTester', () => {
 cy.request('POST', 'http://localhost:3001/api/user/register', user)
})

Cypress.Commands.add('loginTester', () => {
  cy.request('POST', 'http://localhost:3001/api/user/login', login).then((res) => {
    localStorage.setItem('curUser', JSON.stringify(res.body))
  })
})  

Cypress.Commands.add('resetUsers', () => {
  cy.request('POST', 'http://localhost:3001/api/test/resetusers')
})

Cypress.Commands.add('resetOffers', () => {
  cy.request('POST', 'http://localhost:3001/api/test/resetoffers')
})

Cypress.Commands.add('createOffer', (name) => {
  const offer = {
    ...offerWithoutName,
    beerName: name
  }
  const headers = createAuthHeaders()
  cy.request({
    url: 'http://localhost:3001/api/offers',
    method: 'POST',
    body: offer,
    headers: headers.headers,
  })
})