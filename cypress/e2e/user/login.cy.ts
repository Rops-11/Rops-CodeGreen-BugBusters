/// <reference types="cypress" />

describe("login", () => {
  // Define test data for a normal user
  // ** IMPORTANT: Replace with actual normal user credentials for testing **
  const normalUserEmail = "thereal.ugly11@gmail.com"; // Updated email
  const normalUserPassword = "123123123123"; // Updated password

  describe("normal user", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("should allow a normal user to successfully log in and navigate through the pages and then logout", () => {
      cy.get("#email").type(normalUserEmail);

      cy.get("#password").type(normalUserPassword);

      cy.get("button").contains("Login").click();

      cy.url().should("include", "/homepage");

      cy.contains("About").click().wait(3000);
      cy.url().should("include", "/about");

      cy.contains("Policies").click().wait(2000);
      cy.contains("Protocol").click().wait(2000);
      cy.url().should("include", "/protocol");

      cy.contains("Policies").click().wait(2000);

      cy.contains("Rules and Regulations").click().wait(2000);
      cy.url().should("include", "/rules");

      cy.contains("Account").click();
      cy.contains("Log Out").click();

      cy.url().should("include", "/login");
    });
  });
});
