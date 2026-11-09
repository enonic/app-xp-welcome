/**
 * Created on 15.01.2024
 */
const BaseCard = require('./base.card');

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
            return await this.waitForElementDisplayed(this.loginButton);
        } catch (err) {
            await this.handleError("Endpoints area - Login button should be displayed in the Admin card", 'err_admin_card', err);
        }
    }

    async waitForOpenButtonDisplayed() {
        try {
            return await this.waitForElementDisplayed(this.openButton);
        } catch (err) {
            await this.handleError("Endpoints area - Open button should be displayed in the Admin card", 'err_admin_card', err);
        }
    }

    async clickOnLoginButton() {
        await this.waitForLoginButtonDisplayed();
        await this.clickOnElement(this.loginButton);
        await this.pause(1000);
    }
}

module.exports = AdminCard;
