/// <reference types="cypress" />
import 'cypress-map'
chai.use(require('chai-sorted'))

const { _ } = Cypress // importing lodash

function getPriceLists() {
  return cy.get('.inventory_list').should('be.visible')
        .find('.inventory_item_price')
        .should('have.length.greaterThan', 1)
        .map('innerText')
        .print('strings %o')
        .mapInvoke('slice', 1)
        .print('No $ %o')
        .map(Number)
        .print('numbers %o')
}


describe('Inventory Test', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })
  context("Full Inventory Lists", () => {
    before(() => {
      cy.fixture('inventory.json').as('inventoryItems')
    });

    it("Check every items in the inventory Lists", function() {
        this.inventoryItems.forEach(function(listItem) {
          cy.log(`*** List Item: ${listItem.name}***`)
          cy.contains('.inventory_item', listItem.name).within(function(){
            cy.contains('.inventory_item_name', listItem.name);
            cy.contains('.inventory_item_desc', listItem.desc);
            cy.contains('.inventory_item_price', listItem.price);            
          });
        })
    })
  });

  context("Get Lowest and Highest Item Price", () => {
    // Lowest
    it("Get the lowest item price", () => {
       getPriceLists() 
        .apply(_.min)
        .should('equal', 7.99);
    });

    // Highest
    it("Get the highest item price", () => {
      getPriceLists() 
        .apply(_.max)
        .should('equal', 49.99);
    });
  });
});
