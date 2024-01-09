const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const WelcomePage = require('../page_objects/welcome.panel');

describe('Welcome Page specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }

    it('WHEN Home Page is loaded THEN expected buttons should be present in toolbar', async function () {
        let welcomePage = new WelcomePage();
        await welcomePage.waitForLoaded();
        await welcomePage.saveScreenshot('welcome_page_test');
        let actualHeader = await welcomePage.getHeader();
        assert.equal(actualHeader, "Welcome to the Enonic SDK", " header should be displayed");
    });

    before(() => {
        return console.log('specification starting: ' + this.title);
    });
});
