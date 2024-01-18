/**
 * Created on 18.01.2024
 */
const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const testUtils = require('../libs/test.utils');
const WelcomePage = require('../page_objects/app.panel');
const ContentCard = require('../page_objects/endpoints/content.card');
const ProjectsPanel = require('../page_objects/projects.panel');

describe('Projects panel specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }
    const PROJECTS_PANEL_HEADER = 'Content projects';

    it("WHEN 'Browse projects' button has been clicked in Welcome page THEN Projects panel should be loaded",
        async function () {
            let welcomePage = new WelcomePage();
            let contentCard = new ContentCard();
            let projectsPanel = new ProjectsPanel();
            await welcomePage.waitForLoaded();
            // 1. Content Card should be displayed in Endpoints Panel:
            await contentCard.waitForDisplayed();
            // 3. Click on 'Browse projects' button:
            await contentCard.clickOnBrowseProjectsButton();
            await projectsPanel.waitForLoaded();
            await testUtils.saveScreenshot('projects_panel');
            let actualHeader = await projectsPanel.getHeader();
            assert.equal(actualHeader, PROJECTS_PANEL_HEADER, "Expected header should be in the panel");
            // 4. Click on 'Back' button:
            await projectsPanel.clickOnBackButton();
            // 5. Welcome Page should be loaded:
            await welcomePage.waitForLoaded();
        });

    it("WHEN navigate to projects via get-URL THEN Projects panel should be loaded",
        async function () {
            let welcomePage = new WelcomePage();
            let projectsPanel = new ProjectsPanel();
            await welcomePage.waitForLoaded();
            // 1. get the projects URL:
            await testUtils.url(appConst.APP_URLS.PROJECTS);
            // 2. Projects Panel should be loaded:
            await projectsPanel.waitForLoaded();
            await testUtils.saveScreenshot('projects_panel_2');
            // 3. navigate to Welcome page URL:
            await testUtils.url(appConst.APP_URLS.WELCOME_PAGE);
            // 4. Verify that Welcome page is loaded:
            await welcomePage.waitForLoaded();
        });

    beforeEach(() => testUtils.url(appConst.APP_URLS.WELCOME_PAGE));
    afterEach(() => testUtils.refresh());
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });
});
