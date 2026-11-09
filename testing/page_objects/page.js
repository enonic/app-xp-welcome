const webDriverHelper = require('../libs/WebDriverHelper');
const fs = require('fs');
const path = require('path');
const appConst = require("../libs/app_const");

class Page {

    constructor() {
        if (typeof browser !== 'undefined') {
            this.browser = browser;
        } else {
            this.browser = webDriverHelper.browser;
        }
    }

    getBrowser() {
        return this.browser;
    }

    findElement(selector) {
        return this.browser.$(selector);
    }

    findElements(selector) {
        return this.browser.$$(selector);
    }

    keys(value) {
        return this.browser.keys(value);
    }

    pause(ms) {
        return this.browser.pause(ms);
    }

    async clickOnElement(selector) {
        let element = await this.findElement(selector);
        await element.waitForDisplayed({timeout: 1000});
        return await element.click();
    }

    async getText(selector) {
        let element = await this.findElement(selector);
        return await element.getText();
    }

    async saveScreenshot(name) {
        try {
            // The try block is necessary to catch and handle errors and save a screenshot
            let screenshotsDir = path.join(__dirname, '/../build/reports/screenshots/');
            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir, {recursive: true});
            }
            await this.getBrowser().saveScreenshot(screenshotsDir + name + '.png');
            console.log('screenshot is saved ' + name);
        } catch (err) {
            console.log('screenshot was not saved ' + err);
        }
    }

    async saveScreenshotUniqueName(namePart) {
        let screenshotName = appConst.generateRandomName(namePart);
        await this.saveScreenshot(screenshotName);
        return screenshotName;
    }

    waitForElementNotDisplayed(selector, ms = appConst.mediumTimeout) {
        return this.getBrowser().waitUntil(
            () => {
                return this.getDisplayedElements(selector).then((result) => {
                    return result.length === 0;
                });
            },
            { timeout: ms, timeoutMsg: `Timeout exception. Element ${selector} still visible in: ${ms}` },
        );
    }

    async waitForElementDisplayed(selector, ms = appConst.mediumTimeout) {
        let element = await this.findElement(selector);
        return await element.waitForDisplayed({ timeout: ms });
    }

    async pressEscKey() {
        await this.keys('Escape');
        return await this.pause(500);
    }

    getBrowser() {
        return this.browser;
    }

    async getAttribute(selector, attributeName) {
        let element = await this.findElement(selector);
        return await element.getAttribute(attributeName);
    }

    async getTextInDisplayedElements(selector) {
        let results = [];
        let elements = await this.getDisplayedElements(selector);
        if (elements.length === 0) {
            return [];
        }
        for (const item of elements) {
            results.push(await item.getText());
        }
        return results;
    }

    async getDisplayedElements(selector) {
        let elements = await this.findElements(selector);
        if (elements.length === 0) {
            return [];
        }
        let pr = await elements.map(async (el) => await el.isDisplayed());
        return Promise.all(pr).then(result => {
            return elements.filter((el, i) => result[i]);
        });
    }
    async handleError(errorMessage, screenshotName, error) {
        const wrappedMessage = `${errorMessage}: ${error?.message ?? 'Unknown error'} `;

        if (Error.prototype.hasOwnProperty('cause')) {
            throw new Error(`${wrappedMessage}[screenshot]: ${screenshotName}`, { cause: error });
        }
        const wrapped = new Error(wrappedMessage);
        wrapped.cause = error;
        wrapped.screenshotTaken = error?.screenshotTaken;
        wrapped.screenshotName = error?.screenshotName;

        if (!wrapped.screenshotTaken) {
            // keep the generated (unique) file name, so the error message points to the file that really exists:
            wrapped.screenshotName = await this.saveScreenshotUniqueName(screenshotName);
            wrapped.screenshotTaken = true;
            wrapped.message += `[Screenshot]: ${wrapped.screenshotName}`;
        }
        throw wrapped;
    }


}

module.exports = Page;
