const assert = require('node:assert');
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const testUtils = require('../libs/test.utils');
const WelcomePage = require('../page_objects/app.panel');
const ConfigsAreaPanel = require('../page_objects/configs/configs.files.area.panel');

describe('Configuration files panel specification', function () {
    this.timeout(appConst.TIMEOUT_SUITE);
    if (typeof browser === 'undefined') {
        webDriverHelper.setupBrowser();
    }

    it("WHEN 'Welcome Page' is loaded THEN Expected config files should be displayed in the panel",
        async function () {
            let welcomePage = new WelcomePage();
            let configsAreaPanel = new ConfigsAreaPanel();
            await welcomePage.waitForLoaded();
            let items = await configsAreaPanel.getConfigFiles();
            await testUtils.saveScreenshot('configs_panel_cfg_files');
            assert.ok(items.includes('com.enonic.xp.blobstore.cfg'), "Config for 'com.enonic.xp.blobstore.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.web.vhost.cfg'), "Config for 'web.vhost' should be displayed");
            assert.ok(items.includes('com.enonic.xp.admin.cfg'), "Config for 'xp.admin' should be displayed");
            assert.ok(items.includes('com.enonic.xp.app.standardidprovider.cfg'), "Config for 'standardidprovider' should be displayed");
            assert.ok(items.includes('system.properties'), "Config for 'system.properties' should be displayed");
            assert.ok(items.length > 0, 'Expected config items should be displayed in the panel');
        });

    beforeEach(() => testUtils.url(appConst.APP_URLS.WELCOME_PAGE));
    afterEach(() => testUtils.refresh());
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });

});
