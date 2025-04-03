import { LoginPage } from '../pages/loginPage'

const user = Cypress.env('users').standard
const lockedOutUser = Cypress.env('users').lockedOut

describe('User Login Test', () => {
  context('Expected User Login Test Scenario', () => {
    it("Success User Login land in inventory page", () => {
      cy.log('**log in**')
      cy.visit('/')
      LoginPage.getUsername().type(user.username)
      // hide the password from the Console Log
      LoginPage.getPassword().type(user.password, { log: false })
      LoginPage.clickLoginButton().click()
      cy.location('pathname').should('equal', '/inventory.html')
    });
  });

  context('Unexpected User Login Test Scenario', () => {
    it('Display login error for lockout user', () => {
      cy.log('**Locked out user**')
      cy.visit('/')

      LoginPage.getUsername().type(lockedOutUser.username)
      // hide the password from the Console Log
      LoginPage.getPassword().type(lockedOutUser.password, { log: false })
      LoginPage.clickLoginButton().click()

      cy.log('Display Errors')
      LoginPage.displayError('locked out'); 

      cy.get('[data-test="error"] button.error-button').should('be.visible').click();
      LoginPage.getError().should('not.exist');
      LoginPage.getUsername().should('have.value','locked_out_user');
      LoginPage.getPassword().should('have.value','secret_sauce');
    });

    it('Error if visit inventory without user login', () => {
      cy.visit('/inventory.html',{failOnStatusCode: false})
      LoginPage.displayError("Epic sadface: You can only access '/inventory.html' when you are logged in.",
      )
    });

    it('Error if click login button without username field', () => {
      cy.visit('/')
      LoginPage.clickLoginButton().click();
      LoginPage.displayError('Epic sadface: Username is required')
    });

    it('Error if click login button without password field', () => {
      cy.visit('/')
      LoginPage.getUsername().type(user.username)
      LoginPage.clickLoginButton().click();
      LoginPage.displayError('Epic sadface: Password is required')
    });
  });
});
