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

/**
   * @param errorMsg The expected error message
   */
 displayError(errorMsg: string) {
  cy.contains('[data-test=error]', errorMsg).should('be.visible');
  LoginPage.getUsername().should('have.class', 'error')
  LoginPage.getPassword().should('have.class', 'error')
 },

 /**
   * @param username  username
   * @param password  password
 */
 sessionUserLogin(username: string, password: string) {
  cy.session(`User ${username} Session`, () => {
    cy.log('**Session Log In**')
    cy.visit('/')
    LoginPage.getUsername().type(username)
    LoginPage.getPassword().type(password, {log: false})
    LoginPage.clickLoginButton()
    cy.location('pathname').should('equal', '/inventory.html')
  })
 }
}