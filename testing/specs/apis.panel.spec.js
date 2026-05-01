const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const testUtils = require('../libs/test.utils');
const ApisAreaPanel = require('../page_objects/apis/apis.area.panel');

describe('APIs panel specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }
    const MANAGEMENT_ONLY_DESCRIPTOR = 'server:app';

    it("GIVEN APIs panel is loaded WHEN default short list is displayed THEN management-only descriptor 'server:app' should NOT be visible",
        async function () {
            let apisAreaPanel = new ApisAreaPanel();
            await apisAreaPanel.waitForLoaded();
            await testUtils.saveScreenshot('apis_panel_default');
            let descriptors = await apisAreaPanel.getCardDescriptors();
            assert.ok(descriptors.length > 0, "At least one API card should be displayed by default");
            assert.ok(!descriptors.includes(MANAGEMENT_ONLY_DESCRIPTOR),
                `'${MANAGEMENT_ONLY_DESCRIPTOR}' should NOT be displayed by default (mount=['management']), but found: ${descriptors.join(', ')}`);
        });

    it("GIVEN APIs panel is loaded WHEN 'Show all' has been clicked THEN management-only descriptor 'server:app' should become visible",
        async function () {
            let apisAreaPanel = new ApisAreaPanel();
            await apisAreaPanel.waitForLoaded();
            let visibleByDefault = await apisAreaPanel.isCardWithDescriptorDisplayed(MANAGEMENT_ONLY_DESCRIPTOR);
            assert.ok(!visibleByDefault, `'${MANAGEMENT_ONLY_DESCRIPTOR}' should be hidden before clicking 'Show all'`);
            await apisAreaPanel.clickOnShowAllButton();
            await testUtils.saveScreenshot('apis_panel_show_all');
            let visibleAfterToggle = await apisAreaPanel.isCardWithDescriptorDisplayed(MANAGEMENT_ONLY_DESCRIPTOR);
            assert.ok(visibleAfterToggle,
                `'${MANAGEMENT_ONLY_DESCRIPTOR}' should be displayed after clicking 'Show all' (proves it is hidden, not absent)`);
        });

    beforeEach(() => testUtils.url(appConst.APP_URLS.APIS));
    afterEach(() => testUtils.refresh());
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });
});
