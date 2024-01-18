/**
 * Created on 18.01.2024
 */
const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const testUtils = require('../libs/test.utils');
const WelcomePage = require('../page_objects/app.panel');
const ApplicationsAreaPanel = require('../page_objects/applications/applications.area.panel');

describe('Applications panel specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }
    const APPLICATIONS_PANEL_HEADER = 'Installed applications';
    const TEST_APP_NAME = 'All Content Types App';

    it("WHEN 'Welcome Page' is loaded THEN Expected application should be displayed in 'Application panel'",
        async function () {
            let welcomePage = new WelcomePage();
            let applicationsAreaPanel = new ApplicationsAreaPanel();
            await welcomePage.waitForLoaded();
            // 1. Applications Panel should be displayed in Welcome page:
            await applicationsAreaPanel.waitForDisplayed();
            let actualHeader = await applicationsAreaPanel.getHeader();
            assert.equal(actualHeader, APPLICATIONS_PANEL_HEADER, "Expected header should be in the panel");
            // 2. Expected application should be displayed in the panel:
            let appItems = await applicationsAreaPanel.getInstalledApps();
            assert.equal(appItems.length, 1, "Expected config items should be displayed in the panel");
            assert.equal(appItems[0], TEST_APP_NAME, "Expected application should be displayed in the panel");
        });

    beforeEach(() => testUtils.url(appConst.APP_URLS.WELCOME_PAGE));
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });
});
