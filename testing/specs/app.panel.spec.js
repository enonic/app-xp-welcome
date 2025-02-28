const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const testUtils = require('../libs/test.utils');
const WelcomePage = require('../page_objects/app.panel');
const EndpointsAreaPanel = require('../page_objects/endpoints/endpoints.area.panel');
const ConfigsAreaPanel = require('../page_objects/configs/configs.files.area.panel');
const AdminCard = require('../page_objects/endpoints/admin.card');
const LoginPage = require('../page_objects/login.page');

describe('Application Page specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }
    const HEADER = "Welcome to the Enonic SDK";

    it("WHEN 'Welcome Page' is loaded THEN Endpoints and Configs panels should be loaded AND 'Log In' button should be displayed in the Admin Card",
        async function () {
            let welcomePage = new WelcomePage();
            let adminCard = new AdminCard();
            let endpointsAreaPanel = new EndpointsAreaPanel();
            let configsAreaPanel = new ConfigsAreaPanel();
            await welcomePage.waitForLoaded();
            await welcomePage.saveScreenshot('welcome_page_1');
            let actualHeader = await welcomePage.getHeader();
            // Verify the 'Log In' button in 'Admin Card'
            assert.equal(actualHeader, HEADER, "expected header should be displayed");
            await adminCard.waitForLoginButtonDisplayed();
            // Verify that Endpoints panel is loaded:
            await endpointsAreaPanel.waitForLoaded();
            // verify that Configuration files panel is loaded:
            await configsAreaPanel.waitForLoaded();
        });

    it("WHEN 'Welcome Page' is loaded  THEN 'Open' button should be displayed in the Admin Card after login",
        async function () {
            let welcomePage = new WelcomePage();
            let adminCard = new AdminCard();
            await welcomePage.waitForLoaded();
            // 1. Click on Log In button in Admin Card:
            await adminCard.clickOnLoginButton();
            // 2. Login page should be opened in the new browser tab
            await testUtils.doSwitchToLoginPage();
            let loginPage = new LoginPage();
            await loginPage.waitForPageLoaded();
            // 3. Do login
            await loginPage.doLogin('su', 'password');
            // 4. Switch to Welcome page
            await testUtils.doCloseAllWindowTabsAndSwitchToWelcomePage();
            await welcomePage.waitForLoaded();
            // 5. Verify that 'Open' button gets visible in Endpoints panel in Admin card
            await testUtils.refresh();
            await testUtils.saveScreenshot('admin_card_open_btn');
            await adminCard.waitForOpenButtonDisplayed();
        });

    beforeEach(() => testUtils.url(appConst.APP_URLS.WELCOME_PAGE));
    afterEach(() => testUtils.refresh());
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });

});
