describe("Building and playing the game", () => {
  it("visits the app", () => {
    cy.visit("/");
  });
  it("builds and shows the grid", () => {
    cy.get('[data-testid="gameboard"]')
      .children()
      .should("have.length", 9);
  });
});
