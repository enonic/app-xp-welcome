const Page = require('../page');
const appConst = require('../../libs/app_const');

const XPATH = {
    container: "//div[contains(@class,'Panel ApisPanel')]",
    toggleRow: "//div[contains(@class,'ApiPanel-Row')]",
    showAllButton: "//button[normalize-space(text())='Show all']",
    showOnlyMountedButton: "//button[normalize-space(text())='Show only mounted']",
    cardSubtitle: "//div[contains(@class,'ApiCard-Subtitle')]",
    cardByDescriptor: descriptor => `//div[contains(@class,'ApiCard')][.//div[contains(@class,'ApiCard-Subtitle') and normalize-space(.)='${descriptor}']]`,
};

class ApisAreaPanel extends Page {

    get showAllButton() {
        return XPATH.toggleRow + XPATH.showAllButton;
    }

    get showOnlyMountedButton() {
        return XPATH.toggleRow + XPATH.showOnlyMountedButton;
    }

    async waitForLoaded() {
        try {
            await this.waitForElementDisplayed(XPATH.container, appConst.mediumTimeout);
            await this.pause(500);
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_apis_panel');
            throw new Error("APIs Panel should be loaded! screenshot:" + screenshot + ' ' + err);
        }
    }

    async clickOnShowAllButton() {
        await this.waitForElementDisplayed(this.showAllButton, appConst.mediumTimeout);
        await this.clickOnElement(this.showAllButton);
        await this.pause(500);
    }

    async getCardDescriptors() {
        let elements = await this.getDisplayedElements(XPATH.container + XPATH.cardSubtitle);
        let result = [];
        for (const el of elements) {
            result.push(await el.getText());
        }
        return result;
    }

    async isCardWithDescriptorDisplayed(descriptor) {
        let locator = XPATH.container + XPATH.cardByDescriptor(descriptor);
        let elements = await this.getDisplayedElements(locator);
        return elements.length > 0;
    }
}

module.exports = ApisAreaPanel;
