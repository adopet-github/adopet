/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get(':nth-child(1) > .auth-input').type('shelter@cypress.com');
    cy.get(':nth-child(2) > .auth-input').type('Password123');
    cy.get('.primary').click();
  });
});
