/**
 * Created on 15.01.2024
 */
const Page = require('../page');
const lib = require('../../libs/elements');

const XPATH = {
    container: "//div[contains(@class,'Panel EndpointsArea')]",
    showAllEndpointsButton: "//button[text()='Show all endpoints']",
    collapseEndpointsButton: "//button[text()='Collapse endpoints']",
};

class EndpointsAreaPanel extends Page {

    get showAllEndpointsButton() {
        return XPATH.container + XPATH.showAllEndpointsButton;
    }

    get collapseEndpointsButton() {
        return XPATH.container + XPATH.collapseEndpointsButton;
    }

    async waitForCollapseEndpointsButtonDisplayed() {
        try {
            await this.waitForElementDisplayed(this.collapseEndpointsButton);
        } catch (err) {
          await this.handleError("Collapse endpoints button should be displayed", 'err_collapse_btn', err);
        }
    }

    async waitForShowAllEndpointsButtonDisplayed() {
        try {
            await this.waitForElementDisplayed(this.showAllEndpointsButton);
        } catch (err) {
            await this.handleError("Show all endpoints button should be displayed", 'err_show_all_btn', err);
        }
    }

    async isCollapsed() {
        let attr = await this.getAttribute(XPATH.container, 'class');
        return attr.includes('collapsed');
    }

    async clickOnShowAllEndpointsButton() {
        await this.waitForShowAllEndpointsButtonDisplayed();
        await this.clickOnElement(this.showAllEndpointsButton);
        await this.pause(500);
    }

    async clickOnCollapseEndpointsButton() {
        await this.waitForCollapseEndpointsButtonDisplayed();
        return await this.clickOnElement(this.collapseEndpointsButton);
    }

    async waitForLoaded() {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            await this.waitForElementDisplayed(XPATH.container);
        } catch (err) {
            await this.handleError("Welcome Page should be loaded!", 'err_endpoints_panel', err);
        }
    }

    getHeader() {
        let locator = XPATH.container + "//h1[@class='Header-Title']";
        return this.getText(locator);
    }

    async getCardTitles() {
        try {
            let locator = lib.ENDPOINTS.CARD_TITLE;
            await this.waitForElementDisplayed(locator);
            return await this.getTextInDisplayedElements(locator);
        } catch (err) {
            await this.handleError("Endpoints cards should be displayed", 'err_endpoints_panel', err);
        }
    }
}

module.exports = EndpointsAreaPanel;
