/**
 * Created on 15.01.2024
 */
const BaseCard = require('./base.card');
const lib = require('../../libs/elements');
const appConst = require('../../libs/app_const');
const testUtils = require('../../libs/test.utils');

const XPATH = {
    container: "//div[contains(@class,'Card AdminCard')]",
    loginButton: "//button[text()='Log In']",
    openButton: "//button[text()='Open']",
};

class AdminCard extends BaseCard {

    get container() {
        return XPATH.container;
    }

    get loginButton() {
        return XPATH.container + XPATH.loginButton;
    }

    get openButton() {
        return XPATH.container + XPATH.openButton;
    }

    async waitForLoginButtonDisplayed() {
        try {
            return await this.waitForElementDisplayed(this.loginButton, appConst.mediumTimeout);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_admin_card');
            throw new Error("Endpoints area - Login button should be displayed in the Admin card, screenshot:" + screenshot + ' ' + err);
        }
    }

    async waitForOpenButtonDisplayed() {
        try {
            return await this.waitForElementDisplayed(this.openButton, appConst.mediumTimeout);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_admin_card');
            throw new Error("Endpoints area - Open button should be displayed in the Admin card, screenshot:" + screenshot + ' ' + err);
        }
    }

    async clickOnLoginButton() {
        await this.waitForLoginButtonDisplayed();
        await this.clickOnElement(this.loginButton);
        await this.pause(1000);
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

module.exports = AdminCard;
