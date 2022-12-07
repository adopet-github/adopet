/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should display a register button on the home page that redirects to register page', () => {
    cy.get('.primary').should('be.visible').click();
    cy.url().should('include', '/register');
    cy.get('.logo-container').should('be.visible').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('nav bar login button shold redirect to login', () => {
    cy.get('[href="/login"] > .s-_un5CLzVUVqw').should('be.visible').click();
    cy.url().should('include', '/login');
  });

  it('nav bar register button should redirect to register', () => {
    cy.get('[href="/register"] > .s-_un5CLzVUVqw').should('be.visible').click();
    cy.url().should('include', '/register');
  });
});
