/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display correct buttons and inputs', () => {
    // ACCOUNT TYPE
    cy.get('.account-type > :nth-child(1)').should('be.visible');
    cy.get('.account-type > :nth-child(2)').should('be.visible');

    // GOOGLE BUTTON
    cy.get('#google').should('have.text', ' Register with Google');

    // NAMES
    cy.get(':nth-child(1) > .auth-input').should('be.visible');
    cy.get('.names > :nth-child(2) > .auth-input').should('be.visible');

    // FORM
    cy.get('form.s-JBM0olG-qUij > :nth-child(2) > .auth-input').should(
      'be.visible'
    );
    cy.get(':nth-child(3) > .auth-input').should('be.visible');
    cy.get('#autocomplete').should('be.visible');

    // BUTTON
    cy.get('.primary').should('be.visible');

    // GO TO LOGIN
    cy.get('span.s-JBM0olG-qUij > .s-JBM0olG-qUij')
      .should('be.visible')
      .should('have.text', 'Login Now');
  });

  it('should naivgate to login page on already have an account button', () => {
    cy.get('span.s-JBM0olG-qUij > .s-JBM0olG-qUij').click();
    cy.url().should('include', '/login');
  });

  it('should show inputs for a shelter on acccount type change', () => {
    cy.get('.account-type > :nth-child(2)').click();

    cy.get('.names > :nth-child(1) > .auth-input').should('not.exist');
    cy.get('.names > :nth-child(2) > .auth-input').should('not.exist');
    cy.get('.auth-input-container.s-Y1FI21xV5a91 > .auth-input').should(
      'be.visible'
    );
  });
});
