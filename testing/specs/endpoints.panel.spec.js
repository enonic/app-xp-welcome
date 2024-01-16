const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const testUtils = require('../libs/test.utils');
const EndpointsAreaPanel = require('../page_objects/endpoints/endpoints.area.panel');

describe('Endpoints panel specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }

    it("GIVEN Welcome Page is loaded WHEN 'Show all endpoints' button has been clicked THEN 'Collapse Endpoints' button gets visible",
        async function () {
            let endpointsAreaPanel = new EndpointsAreaPanel();
            let isCollapsed = await endpointsAreaPanel.isCollapsed();
            assert.ok(isCollapsed, "Endpoints Area Panel should be collapsed by default");
            // Click on 'Show All Endpoints' button:
            await endpointsAreaPanel.clickOnShowAllEndpointsButton();
            // Verify  that the panel gets collapsed:
            isCollapsed = await endpointsAreaPanel.isCollapsed();
            assert.ok(isCollapsed === false, "Endpoints Area Panel gets expanded");
            // 'Collapse endpoints' button gets visible:
            await endpointsAreaPanel.waitForCollapseEndpointsButtonDisplayed();
        });

    it("GIVEN 3 cards is visible in 'Endpoints Panel' by default WHEN 'Show all endpoints' button has been clicked THEN 7 cards gets visible in the expanded mode",
        async function () {
            let endpointsAreaPanel = new EndpointsAreaPanel();
            let cards = await endpointsAreaPanel.getCardTitles();
            assert.equal(cards.length, 3, "3 cards should be displayed by default");
            // Click on 'Show All Endpoints' button:
            await endpointsAreaPanel.clickOnShowAllEndpointsButton();
            // Verify that 7 cards are visible in the expanded mode:
            cards = await endpointsAreaPanel.getCardTitles();
            assert.equal(cards.length, 7, "7 cards gets visible after clicking on 'Show All Endpoints' button");
        });

    beforeEach(() => testUtils.url("http://127.0.0.1:8080/"));
    afterEach(() => testUtils.refresh());
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });

});
