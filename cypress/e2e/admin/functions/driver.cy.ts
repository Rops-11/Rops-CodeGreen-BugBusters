/// <reference types="cypress" />

describe("driver functionalities", () => {
  const adminEmail = "jrofer.casio11@gmail.com";
  const adminPassword = "123123123";

  describe("add driver", () => {
    beforeEach(() => {
      cy.login(adminEmail, adminPassword);
    });
    it("should add a driver", () => {
      cy.get(".flex-col > .items-center > .transition-transform")
        .contains("Encode")
        .click();
      cy.contains("What would you like to do?").should("be.visible");
      cy.contains("Add Driver").click();

      cy.get(":nth-child(1) > :nth-child(1) > .bg-secondgrey").type("Casio");
      cy.get(
        ".space-y-5 > :nth-child(1) > .flex > .flex-1 > .bg-secondgrey",
      ).type("Binas");
      cy.get(".space-y-5 > :nth-child(2) > .flex-1 > .bg-secondgrey").type(
        "John Rofer",
      );
      cy.get(":nth-child(3) > .bg-secondgrey").type("wow@gmail.com");
      cy.contains("Next").click();

      cy.get(":nth-child(1) > .flex-1 > .bg-secondgrey").select("Male");
      cy.get(":nth-child(2) > .flex-1 > .bg-secondgrey").type("2003-09-11");
      cy.get(":nth-child(3) > .flex-1 > .bg-secondgrey").select("Student");
      cy.contains("Next").click();

      cy.get(".flex > .flex-1 > .bg-secondgrey").type("123123123123");
      cy.get(":nth-child(2) > .bg-secondgrey").type("2030-09-11");
      cy.contains("Next").click();

      cy.intercept("POST", "http://localhost:4445/driver/add").as("addDriver");

      cy.contains("Submit").click();

      cy.wait("@addDriver").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
      });

      cy.contains("Driver Successfully Added").should("be.visible");

      cy.url().should("include", "/admin", { timeout: 10000 });
    });

    it("should check the drivers list", () => {
      cy.intercept("GET", "http://localhost:4445/driver/get").as("getDrivers");

      cy.get(".grid > :nth-child(1)").contains("View Drivers").click();

      cy.wait("@getDrivers").then((interception) => {
        expect(interception.response?.statusCode).to.be.oneOf([304, 200]);
        expect(interception.response?.body).to.be.an("array");
      });
      cy.url().should("include", "/driverslist");
    });

    it("should delete latest driver added", () => {
      cy.intercept("DELETE", "http://localhost:4445/driver/delete").as(
        "deleteDriver",
      );

      cy.get(".grid > :nth-child(1)").contains("View Drivers").click();
      cy.get(":nth-child(1) > #row > .p-2 > .relative > .text-white").click();
      cy.contains("Delete").click();

      cy.wait("@deleteDriver").then((interception) => {
        expect(interception.response?.statusCode).to.be.eq(200);
      });
    });
  });
});
