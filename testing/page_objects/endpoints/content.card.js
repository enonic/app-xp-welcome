/**
 * Created on 15.01.2024
 */
const BaseCard = require('./base.card');
const lib = require('../../libs/elements');
const appConst = require('../../libs/app_const');
const testUtils = require('../../libs/test.utils');

const XPATH = {
    container: "//div[contains(@class,'Card') and descendant::h2[text()='Content']]",
    cardTitle: "//h2[contains(@class,'Card-Title')]",
    subTitle: "//p[contains(@class,'Card-Subtitle')]",
    browseProjectsButton: "//button[text()='Browse projects']",

};

class ContentCard extends BaseCard {

    get container() {
        return XPATH.container;
    }

    get browseProjectsButton() {
        return XPATH.container + XPATH.browseProjectsButton;
    }

    waitForOpenButtonDisplayed() {
        return this.waitForElementDisplayed(this.openButton, appConst.mediumTimeout);
    }

    async clickOnOpenButton() {
        try {
            await this.waitForOpenButtonDisplayed();
            await this.clickOnElement(this.openButton);
            await this.pause(400);
            // TODO - switch to home page:
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_open_button');
            throw new Error('Welcome page, admin card - Error after clicking on Open button, screenshot: ' + screenshot + ' ' + err);
        }
    }
}

module.exports = ContentCard;
