const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Update if using a different port
    setupNodeEvents(on, config) {
      // Add custom event listeners if needed
      on("before:browser:launch", (browser = {}, launchOptions) => {
        // Mock geolocation globally
        launchOptions.preferences.default["geolocation"] = { latitude: 40.7128, longitude: -74.0060 };
        return launchOptions;
      });
    },
    video: false, // Disables video recording
    screenshotOnRunFailure: true, // Capture screenshots on failure
  },
});