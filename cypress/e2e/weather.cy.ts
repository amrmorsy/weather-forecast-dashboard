describe("Weather Forecast App", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should load the homepage", () => {
        cy.contains("Weather Forecast").should("be.visible");
    });

    it("should allow users to search for a city", () => {
        cy.get(".search-input").type("Los Angeles, California{downArrow}").type("{enter}");
        cy.contains("Los Angeles").should("be.visible");
        cy.contains("California US").should("be.visible");
    });

    it("should display weather data after search", () => {
        cy.get(".search-input").type("London{enter}");
        cy.wait(2000); // Wait for API response
        cy.get(".current-weather").should("be.visible");
    });

    it("should clear input if user clicks on clear icon inside input", () => {
        cy.get(".search-input").type("some random text");
        cy.get(".clear-input").click()
        cy.get('.search-input').should("have.value", "");
    })

    it("should allow users to toggle dark mode", () => {
        cy.get(".themeToggleBtn").click();
        cy.get("html").should("have.attr", "data-theme", "dark");

        cy.get(".themeToggleBtn").click();
        cy.get("html").should("have.attr", "data-theme", "light");
    });

    it("should allow users to cycle through autocomplete suggestions with arrow keys", () => {
        cy.get(".search-input").type("San");
        cy.wait(1000); // Wait for autocomplete suggestions

        cy.get(".search-input").type("{downArrow}"); // Select first suggestion
        cy.get(".search-input").type("{downArrow}"); // Cycle through
        cy.get(".search-input").type("{downArrow}"); // Cycle again
    });

    it("should display forecast charts", () => {
        cy.get(".search-input").type("Tokyo{enter}");
        cy.wait(3000); // Wait for charts to load
        cy.get(".chart-container").should("have.length.at.least", 1); // Ensure charts are rendered
    });
});
