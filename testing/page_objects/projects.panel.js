/**
 * Created on 18.01.2024
 */
const Page = require('./page');
const appConst = require('../libs/app_const');

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
            await this.waitForElementDisplayed(this.header, appConst.mediumTimeout);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_projects_panel');
            throw new Error("Projects Panel should be loaded! screenshot:" + screenshot + ' ' + err);
        }
    }

    async clickOnBackButton() {
        try {
            await this.waitForElementDisplayed(this.backButton, appConst.mediumTimeout);
            await this.clickOnElement(this.backButton);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_back_btn');
            throw new Error("Project Panel, error during clicking on 'Back' button, screenshot:" + screenshot + ' ' + err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h1[@class='Header-Title']";
        return this.getText(locator);
    }
}

module.exports = ProjectsPanel;
