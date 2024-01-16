/**
 * Created on 09.01.2024
 */
const Page = require('./page');
const appConst = require('../libs/app_const');

const XPATH = {
    container: "//div[contains(@class,'App')]",
};

class AppPanel extends Page {

    async waitForLoaded() {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            await this.waitForElementDisplayed(XPATH.container, appConst.mediumTimeout);
            await this.pause(1000);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_welcome_page');
            throw new Error("Welcome Page should be loaded! screenshot:" + screenshot + ' ' + err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h1[@class='Header-Title']";
        return this.getText(locator);
    }
}

module.exports = AppPanel;
