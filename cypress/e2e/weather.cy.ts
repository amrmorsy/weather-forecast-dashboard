describe("Weather Forecast App", () => {
    it("Searches for a city and displays weather", () => {
        cy.visit("/");
        cy.get("input").type("New York");
        cy.get("button").contains("Search").click();
        cy.contains("Temperature").should("exist");
    });

    it("Uses geolocation", () => {
        cy.visit("/");
        cy.get("button").contains("Use My Location").click();
        cy.contains("Temperature").should("exist");
    });
});
