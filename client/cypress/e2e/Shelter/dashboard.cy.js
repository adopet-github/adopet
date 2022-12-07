/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('.auth-input:nth-child(1)').type('shelter@cypress.com');
    cy.get('.auth-input').type('Password123');
    cy.get('.primary').click();
  });

  it('should display a list of animals', () => {
    cy.get('.list-item').should('have.length', 0);
  });
});
