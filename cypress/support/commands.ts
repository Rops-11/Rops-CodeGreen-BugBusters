/// <reference types="cypress" />

// This line is optional but can sometimes help if your IDE isn't picking up the global declarations.
// It ensures this file is treated as a module, which can help with global augmentations.
export {}; // Add this if you still have issues after uncommenting, or if your tsconfig has "isolatedModules": true

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user.
       * @example cy.login('test@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>; // Or Chainable<Element> if it yields something specific
      // You can remove drag, dismiss, and the visit overwrite if you're not using them right now
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get(".bg-login-bg").should("be.visible");

  cy.get("#email").clear().type(email);
  cy.get("#password").clear().type(password);
  cy.get('[data-testid="login-button"]').click();

  cy.get(".Toastify__toast-body").contains("Logged In Successfully!");
  cy.url().should("include", "admin");
  cy.contains("Welcome,");
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... }) // You've done this above

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
