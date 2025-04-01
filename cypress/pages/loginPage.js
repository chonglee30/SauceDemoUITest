// @ts-check
/// <reference types="cypress" />

export const LoginPage = {
  getUsername() {
    return cy.get('[data-test="username"]')
  },
  getPassword() {
    return cy.get('[data-test="password"]')
  },

  clickLoginButton() {
    return cy.get('#login-button')
  },

  getError() {
    return cy.get('[data-test="error"]')
 },

 noErrorExist() {
  cy.log('**there are no errors**')
  LoginPage.getError().should('not.exist')
  LoginPage.getUsername().should('not.have.class', 'error')
  LoginPage.getPassword().should('not.have.class', 'error')
},

 displayError(errorMsg) {
  cy.contains('[data-test=error]', errorMsg).should('be.visible');
  LoginPage.getUsername().should('have.class', 'error')
  LoginPage.getPassword().should('have.class', 'error')
 },

 sessionUserLogin(username, password) {
  cy.session(`User ${username} Session`, () => {
    cy.log('**Session Log In**')
    cy.visit('/')
    LoginPage.getUsername().type(username)
    LoginPage.getPassword().type(password, {log: false})
    LoginPage.getLogin().click()
    cy.location('pathname').should('equal', '/inventory.html')
  })
 }
}