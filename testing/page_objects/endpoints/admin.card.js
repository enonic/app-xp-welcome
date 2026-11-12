/**
 * Created on 15.01.2024
 */
const BaseCard = require('./base.card');
const appConst = require('../../libs/app_const');

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

    // Reloads the Welcome page until the 'Open' button is displayed in the Admin card.
    // 'loggedIn' is evaluated on the server on every load of the page, so this is the signal that a login
    // started in another tab has completed, without sending any WebDriver command to that tab.
    async waitForLoggedIn(ms = appConst.TIMEOUT_LOGIN) {
        let deadline = Date.now() + ms;
        while (true) {
            await this.getBrowser().refresh();
            await this.waitForDisplayed();
            let openButtons = await this.getDisplayedElements(this.openButton);
            if (openButtons.length > 0) {
                return;
            }
            if (Date.now() > deadline) {
                await this.handleError(`Admin card - 'Open' button is not displayed within ${ms} ms after login`,
                    'err_admin_card_login', new Error('login did not complete'));
            }
            await this.pause(500);
        }
    }

    async clickOnLoginButton() {
        await this.waitForLoginButtonDisplayed();
        await this.clickOnElement(this.loginButton);
        await this.pause(1000);
    }
}

module.exports = AdminCard;
