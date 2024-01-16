/**
 * Created on 16.01.2024
 */
const Page = require('../page');
const appConst = require('../../libs/app_const');
const lib = require('../../libs/elements');

const XPATH = {
    container: "//div[contains(@class,'Panel ApplicationsArea')]",
    installedAppName: "//div[contains(@class,'ApplicationView')]//h4[contains(@class,'ApplicationView-Title')]",
};

class ApplicationsAreaPanel extends Page {

    async waitForDisplayed() {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            await this.waitForElementDisplayed(XPATH.container, appConst.mediumTimeout);
            await this.pause(500);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_app_panel');
            throw new Error("Applications Area Panel should be loaded! screenshot:" + screenshot + ' ' + err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h2[@class='ApplicationsArea-Title']";
        return this.getText(locator);
    }

    async getInstalledApp() {
        try {
            let locator = XPATH.container + XPATH.installedAppName;
            await this.waitForElementDisplayed(locator, appConst.mediumTimeout);
            return await this.getTextInDisplayedElements(locator);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_app_panel');
            throw new Error("Installed Applications panel -  screenshot:" + screenshot + ' ' + err);
        }
    }
}

module.exports = ApplicationsAreaPanel;
