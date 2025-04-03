import 'cypress-map'
// @ts-ignore
chai.use(require('chai-sorted'))

describe('Sorting Test', () => {
  context('Expected Sorting Test Scenario', () => {
    beforeEach(() => {
        cy.log('**Log in**')
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.location('pathname').should('equal', '/inventory.html')
    });

    /**
      * Sort Item Options: by price
      * @param {'lohi'|'hilo'|'az'|'za'} order
      */
  function sortItemOption(order: string) {
    expect(order, 'sort order').to.be.oneOf(['lohi','hilo','az','za']);
    cy.log(`**sort by price ${order}**`)
    cy.get('[data-test="product-sort-container"]').select(order)
  }

  function inventoryListsCheck() {
    cy.get('.inventory_list').should('be.visible')
  }

  function getPricesOrder() {
    return  cy.get('.inventory_item_price')
    .map('innerText')
    .print('strings %o')
    .mapInvoke('slice', 1)
    .print('Without $: %o')
    .map(Number)
    .print('Number(Not String): %o')
  }

  function getNamesOrder() {
    return cy
    .get('.inventory_item_name')
    .map('innerText')
    .print('names %o')
  }

    it('Sort Ascending Price Order Test', () => {
        sortItemOption('lohi')
        inventoryListsCheck()
        getPricesOrder().should('be.ascending')
    });

    it('Sort Descending Price Order Test', () => {
      sortItemOption('hilo')
      inventoryListsCheck()
      getPricesOrder().should('be.descending')
    });

    it('Sort Ascending Name Order Test', () => {
      sortItemOption('az')
      inventoryListsCheck()
      getNamesOrder().should('be.ascending')
    });

    it('Sort Descending Name Order Test', () => {
      sortItemOption('za')
      inventoryListsCheck()
      getNamesOrder().should('be.descending')
    });
  });
});
