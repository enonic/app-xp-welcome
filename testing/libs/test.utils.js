/**
 * Created on 11.01.2024
 */
const appConst = require("./app_const");
const webDriverHelper = require("./WebDriverHelper");
const fs = require('fs');
const path = require('path');
module.exports = {

    getBrowser() {
        if (typeof browser !== 'undefined') {
            return browser;
        } else {
            return webDriverHelper.browser;
        }
    },
    url(url) {
        return this.getBrowser().url(url);
    },
    async refresh() {
        await this.getBrowser().refresh();
        await this.getBrowser().pause(1000);
    },

    async doSwitchToNextTab() {
        let tabs = await this.getBrowser().getWindowHandles();
        return await this.getBrowser().switchToWindow(tabs[tabs.length - 1]);
    },
    async doSwitchToLoginPage() {
        try {
            await this.getBrowser().switchWindow("Enonic XP - Login");
        } catch (err) {
            let screenshot = await this.saveScreenshotUniqueName('err_switch_to_login_page');
            throw Error("Error during switch to Log In page, screenshot:" + screenshot + ' ' + err);
        }
    },
    saveScreenshot(name, that) {
        let screenshotsDir = path.join(__dirname, '/../build/reports/screenshots/');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, {recursive: true});
        }
        return this.getBrowser().saveScreenshot(screenshotsDir + name + '.png').then(() => {
            return console.log('screenshot saved ' + name);
        }).catch(err => {
            return console.log('screenshot was not saved ' + screenshotsDir + 'utils  ' + err);
        })
    },
    async doCloseAllWindowTabsAndSwitchToWelcomePage() {
        let windows = await this.getBrowser().getWindowHandles();
        for (const handle of windows) {
            let result = await this.switchAndCheckTitle(handle, appConst.WELCOME_PAGE_TITLE);
            if (!result) {
                await this.getBrowser().closeWindow();
            }
        }

        return await this.doSwitchToWelcomePage();
    },
    async switchToTabContains(text) {
        let handles = await this.getBrowser().getWindowHandles();
        for (const handle of handles) {
            await this.getBrowser().switchToWindow(handle);
            let currentTitle = await this.getBrowser().getTitle();
            if (currentTitle.includes(text)) {
                return handle;
            }
        }
        throw new Error('Browser tab with title ' + text + ' was not found');
    },
    async doSwitchToWelcomePage() {
        console.log('testUtils:switching to Welcome page...');
        await this.switchToTabContains(appConst.WELCOME_PAGE_TITLE);

    },
    async doSwitchToLoginPage() {
        console.log('testUtils:switching to Login page...');
        await this.switchToTabContains(appConst.LOGIN_PAGE_TITLE);
    },
    async switchAndCheckTitle(handle, reqTitle) {
        try {
            await this.getBrowser().switchToWindow(handle);
            let title = await this.getBrowser().getTitle();
            return title.includes(reqTitle);
        } catch (err) {
            throw new Error("Error during checkin the Title  " + err);
        }
    }
};
