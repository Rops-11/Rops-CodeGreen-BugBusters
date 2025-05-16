/// <reference types="cypress" />

describe("login", () => {
  const adminEmail = "jrofer.casio11@gmail.com";
  const adminPassword = "123123123";
  const adminNewPassword = "newPassword";

  describe("admin", () => {
    it("should allow an admin to change their password and then change it back", () => {
      // Login
      cy.login(adminEmail, adminPassword);

      // Change Password
      cy.contains("Account").click();
      cy.contains("Change Password").click();
      cy.get(":nth-child(2) > .flex > .bg-secondgrey").type(adminPassword);
      cy.get(":nth-child(3) > .flex > .bg-secondgrey").type(adminNewPassword);
      cy.get(":nth-child(4) > .flex > .bg-secondgrey").type(adminNewPassword);
      cy.get(".justify-between > :nth-child(2)").click();

      cy.get(".Toastify__toast-body > :nth-child(2)")
        .contains("Password has been successfully changed.")
        .click();

      // Clean Up
      cy.contains("Account").click();
      cy.contains("Change Password").click();
      cy.get(":nth-child(2) > .flex > .bg-secondgrey").type(adminNewPassword);
      cy.get(":nth-child(3) > .flex > .bg-secondgrey").type(adminPassword);
      cy.get(":nth-child(4) > .flex > .bg-secondgrey").type(adminPassword);
      cy.get(".justify-between > :nth-child(2)").click();

      // Log out
      cy.get(".Toastify__toast-body > :nth-child(2)")
        .should("be.visible")
        .contains("Password has been successfully changed.")
        .click();

      cy.logout();
    });
  });
});
