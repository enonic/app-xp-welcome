/**
 * Created on 18.01.2024
 */
const Page = require('./page');

const XPATH = {
    container: "//div[contains(@class,'App')]",
};

class ProjectsPanel extends Page {

    get backButton() {
        return XPATH.container + "//button[contains(@class,'BackButton')]";
    }

    get header() {
        return XPATH.container + "//h1[text()='Content projects']"
    }

    async waitForLoaded() {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            await this.waitForElementDisplayed(this.header);
        } catch (err) {
            await this.handleError("Projects Panel should be loaded!", 'err_projects_panel', err);
        }
    }

    async clickOnBackButton() {
        try {
            await this.waitForElementDisplayed(this.backButton);
            await this.clickOnElement(this.backButton);
        } catch (err) {
            await this.handleError("Project Panel, error during clicking on 'Back' button", 'err_back_btn', err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h1[@class='Header-Title']";
        return this.getText(locator);
    }
}

module.exports = ProjectsPanel;
