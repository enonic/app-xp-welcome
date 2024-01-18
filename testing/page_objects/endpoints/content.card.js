/**
 * Created on 15.01.2024
 */
const BaseCard = require('./base.card');
const lib = require('../../libs/elements');
const appConst = require('../../libs/app_const');


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

    waitForBrowseProjectsButtonDisplayed() {
        return this.waitForElementDisplayed(this.browseProjectsButton, appConst.mediumTimeout);
    }

    async clickOnBrowseProjectsButton() {
        try {
            await this.waitForBrowseProjectsButtonDisplayed();
            await this.clickOnElement(this.browseProjectsButton);
            await this.pause(400);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_open_button');
            throw new Error('Welcome page, admin card - Error after clicking on Open button, screenshot: ' + screenshot + ' ' + err);
        }
    }
}

module.exports = ContentCard;
