describe("Building and playing the game", () => {
  it("visits the app", () => {
    cy.visit("/");
  });

  it("builds and shows the empty grid", () => {
    cy.get('[data-testid="gameboard"]')
      .children()
      .should("have.length", 9)
      .should("have.value", " ");
  });

  it("clicks on box and fills the box with a correct char", () => {
    cy.get('[data-testid="gameboard"] :nth-child(7)').click();
    cy.get('[data-testid="gameboard"] > button').each((b, i) => {
      b.click();
      expect(b.attr("value")).oneOf(["X", "O"]);
    });
  });

  it("clicks again on box does not change value", () => {
    cy.get('[data-testid="gameboard"] > button').each((b, i) => {
      const bVal = b.attr("value");

      b.click();
      cy.get(b).should("have.value", bVal);
    });
  });

  it("plays the game and wins", () => {
    cy.reload();

    cy.get('[data-testid="gameboard"] :nth-child(1)').click();
    cy.get('[data-testid="gameboard"] :nth-child(4)').click();
    cy.get('[data-testid="gameboard"] :nth-child(2)').click();
    cy.get('[data-testid="gameboard"] :nth-child(5)').click();
    cy.get('[data-testid="gameboard"] :nth-child(3)').click();

    cy.get('[data-testid="winner"]').should("have.text", "X");
  });
});
