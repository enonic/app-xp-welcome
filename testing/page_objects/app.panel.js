/**
 * Created on 09.01.2024
 */
const Page = require('./page');

const XPATH = {
    container: "//div[contains(@class,'App')]",
};

class AppPanel extends Page {

    async waitForLoaded() {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            let locator = XPATH.container + "//h1[text()='Welcome to the Enonic SDK']";
            await this.waitForElementDisplayed(locator);
            await this.pause(1000);
        } catch (err) {
            await this.handleError("Welcome Page should be loaded!", 'err_welcome_page', err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h1[@class='Header-Title']";
        return this.getText(locator);
    }
}

module.exports = AppPanel;
