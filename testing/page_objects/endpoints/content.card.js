/**
 * Created on 15.01.2024
 */
const BaseCard = require('./base.card');


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
        return this.waitForElementDisplayed(this.browseProjectsButton);
    }

    async clickOnBrowseProjectsButton() {
        try {
            await this.waitForBrowseProjectsButtonDisplayed();
            await this.clickOnElement(this.browseProjectsButton);
            await this.pause(400);
        } catch (err) {
            await this.handleError('Welcome page, admin card - Error after clicking on Open button', 'err_open_button', err);
        }
    }
}

module.exports = ContentCard;
