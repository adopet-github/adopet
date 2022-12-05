/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('swipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get(':nth-child(1) > .auth-input').type('adopter@cypress.com');
    cy.get(':nth-child(2) > .auth-input').type('Password123');
    cy.get('.primary').click();
  });

  it('should display buttons', () => {
    cy.get('.no').should('be.visible');
    cy.get('.info').should('be.visible');
    cy.get('.yes').should('be.visible');
  });

  it('should open and close the info tab on click', () => {
    cy.get(
      '[style="transform: scale(1) translateY(-50%);"] > h1.s-NhgXKFr-1if3'
    ).should('not.exist');
    cy.get('.info').click();
    cy.get(
      '[style="transform: scale(1) translateY(-50%);"] > h1.s-NhgXKFr-1if3'
    ).should('be.visible');
    cy.get('.info').click();
    cy.get(
      '[style="transform: scale(1) translateY(-50%);"] > h1.s-NhgXKFr-1if3'
    ).should('not.exist');
  });
});
