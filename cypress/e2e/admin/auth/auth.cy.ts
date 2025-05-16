/// <reference types="cypress" />

describe("login", () => {
  const adminEmail = "jrofer.casio11@gmail.com";
  const adminPassword = "123123";
  const adminNewPassword = "newPassword";

  describe("admin", () => {
    it("change password and test new password", () => {
      cy.login(adminEmail, adminPassword);

    });
  });
});
