/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display the correct inputs and buttons', () => {
    // GOOGLE BUTTON
    cy.get('#google').should('have.text', ' Login with Google');

    // EMAIL + PASSWORD INPUT
    cy.get(':nth-child(1) > .auth-input').should('be.visible');
    cy.get(':nth-child(2) > .auth-input').should('be.visible');

    // LOGIN BUTTON
    cy.get('.primary').should('be.visible');
    cy.get('.primary').should('have.text', 'Login');

    // NAVIGATE TO REIGSTER
    cy.get('p.s-B33ADDWqBt9L').should('be.visible');
    cy.get('span.s-B33ADDWqBt9L > .s-B33ADDWqBt9L')
      .should('be.visible')
      .should('have.text', 'Register');
  });

  it('should navigate to register page on dont have an account button click', () => {
    cy.get('span.s-B33ADDWqBt9L > .s-B33ADDWqBt9L').click();
    cy.url().should('include', '/register');
  });

  it('should show an error with wrong credentials and reset input fields', () => {
    cy.get(':nth-child(1) > .auth-input').type('wrong@email.com');
    cy.get(':nth-child(2) > .auth-input').type('notThePassword3456');
    cy.get('.primary').click();
    cy.get('.error-message')
      .should('be.visible')
      .should('have.text', 'Email or password incorrect');
    cy.get(':nth-child(1) > .auth-input').should('have.value', '');
    cy.get(':nth-child(2) > .auth-input').should('have.value', '');
  });

  it('should successfully login and logout with an adopter profile', () => {
    cy.get(':nth-child(1) > .auth-input').type('adopter@cypress.com');
    cy.get(':nth-child(2) > .auth-input').type('Password123');
    cy.get('.primary').click();
    cy.url().should('include', '/user/swipe');
    cy.get('[href="/login"] > .s-_un5CLzVUVqw').should('not.exist');
    cy.get('[href="/register"] > .s-_un5CLzVUVqw').should('not.exist');
    cy.visit('http://localhost:5173/shelter/dashboard');
    cy.url().should('eq', 'http://localhost:5173/user/swipe');
    cy.get('.s-PyqO8UEd1xC1').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.visit('http://localhost:5173/user/swipe');
    cy.url().should('eq', 'http://localhost:5173/login');
  });

  it('should successfully login and logout with a shelter profile', () => {
    cy.get(':nth-child(1) > .auth-input').type('shelter@cypress.com');
    cy.get(':nth-child(2) > .auth-input').type('Password123');
    cy.get('.primary').click();
    cy.url().should('include', '/shelter/dashboard');
    cy.get('[href="/login"] > .s-_un5CLzVUVqw').should('not.exist');
    cy.get('[href="/register"] > .s-_un5CLzVUVqw').should('not.exist');
    cy.visit('http://localhost:5173/user/swipe');
    cy.url().should('eq', 'http://localhost:5173/shelter/dashboard');
    cy.get('.s-PyqO8UEd1xC1').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.visit('http://localhost:5173/shelter/dashboard');
    cy.url().should('eq', 'http://localhost:5173/login');
  });
});
