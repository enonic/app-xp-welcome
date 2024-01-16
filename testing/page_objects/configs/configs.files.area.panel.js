/**
 * Created on 16.01.2024
 */
const Page = require('../page');
const appConst = require('../../libs/app_const');
const lib = require('../../libs/elements');

const XPATH = {
    container: "//div[contains(@class,'Panel ConfigsArea')]",
    listItemText: "//li/span",
};

class ConfigsAreaPanel extends Page {

    async waitForLoaded() {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            await this.waitForElementDisplayed(XPATH.container, appConst.mediumTimeout);
            await this.pause(500);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_configs_panel');
            throw new Error("Configurations Area Panel should be loaded! screenshot:" + screenshot + ' ' + err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h2[@class='ConfigsArea-Title']";
        return this.getText(locator);
    }

    async getConfigFiles() {
        try {
            let locator = XPATH.container + XPATH.listItemText;
            await this.waitForElementDisplayed(locator, appConst.mediumTimeout);
            return await this.getTextInDisplayedElements(locator);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_endpoints_panel');
            throw new Error("Configurations files panel -  screenshot:" + screenshot + ' ' + err);
        }
    }
}

module.exports = ConfigsAreaPanel;
