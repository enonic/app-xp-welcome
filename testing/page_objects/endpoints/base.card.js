/**
 * Created on 15.01.2024
 */
const Page = require('../page');

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
            await this.waitForElementDisplayed(this.container);
        } catch (err) {
            await this.handleError('Endpoints-card should be displayed', 'err_card', err);
        }
    }

    async waitForNotDisplayed() {
        try {
            return this.waitForElementNotDisplayed(XPATH.container);
        } catch (err) {
            await this.handleError('Endpoints-card should not be displayed', 'err_card', err);
        }
    }

}

module.exports = BaseCard;
