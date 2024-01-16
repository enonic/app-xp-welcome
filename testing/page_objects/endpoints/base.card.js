/**
 * Created on 15.01.2024
 */
const Page = require('../page');
const appConst = require('../../libs/app_const');

const XPATH = {
    cardTitle: "//h2[contains(@class,'Card-Title')]",
    subTitle: "//p[contains(@class,'Card-Subtitle')]"
};

class BaseCard extends Page {

    get cardTitle() {
        return this.container + XPATH.cardTitle;
    }

    get cardSubtitle() {
        return this.container + XPATH.subTitle;
    }

    get cardDescription() {
        return this.container + "//article[contains(@class,'Card-Description')]";
    }

    async waitForDisplayed() {
        try {
            await this.waitForElementDisplayed(this.container, appConst.mediumTimeout)
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_card');
            throw new Error('Endpoints-card should be displayed, screenshot:' + screenshot + ' ' + err);
        }
    }

    async waitForNotDisplayed() {
        try {
            return this.waitForElementNotDisplayed(XPATH.container, appConst.mediumTimeout);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_card');
            throw new Error('Endpoints-card should not be displayed, screenshot:' + screenshot + ' ' + err);
        }
    }

}

module.exports = BaseCard;
