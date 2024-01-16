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
            assert.equal(items.length, 33, "Expected config items should be displayed in the panel");
            assert.ok(items.includes('com.enonic.xp.app.cfg'), "Config for 'xp app' should be displayed");
            assert.ok(items.includes('com.enonic.xp.web.vhost.cfg'), "Config for 'web.vhost' should be displayed");
            assert.ok(items.includes('com.enonic.xp.app.main.cfg'), "Config for 'app.main' should be displayed");
            assert.ok(items.includes('com.enonic.xp.admin.cfg'), "Config for 'xp.admin' should be displayed");
            assert.ok(items.includes('com.enonic.xp.app.standardidprovider.cfg'), "Config for 'standardidprovider' should be displayed");
            assert.ok(items.includes('com.enonic.xp.audit.cfg'), "Config for 'xp.audit' should be displayed");
            assert.ok(items.includes('com.enonic.xp.blobstore.cfg'), "Config for 'com.enonic.xp.blobstore.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.blobstore.file.cfg'),
                "Config for 'com.enonic.xp.blobstore.file.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.cluster.cfg'), "Config for 'com.enonic.xp.cluster.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.content.cfg'), "Config for 'com.enonic.xp.content.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.elasticsearch.cfg'),
                "Config for 'com.enonic.xp.elasticsearch.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.export.cfg'), "Config for 'com.enonic.xp.export.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.extractor.cfg'), "Config for 'com.enonic.xp.extractor.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.hazelcast.cfg'), "Config for 'com.enonic.xp.hazelcast.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.mail.cfg'), "Config for 'com.enonic.xp.mail.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.media.cfg'), "Config for 'com.enonic.xp.media.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.portal.cfg'), "Config for 'com.enonic.xp.portal.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.repo.cfg'), "Config for 'com.enonic.xp.repo.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.scheduler.cfg'), "Config for 'com.enonic.xp.scheduler.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.security.cfg'), "Config for 'com.enonic.xp.security.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.server.deploy.cfg'),
                "Config for 'com.enonic.xp.server.deploy.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.server.shell.cfg'), "Config for 'com.enonic.xp.server.shell.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.server.trace.cfg'), "Config for 'com.enonic.xp.server.trace.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.server.udc.cfg'), "Config for 'com.enonic.xp.server.udc.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.task.cfg'), "Config for 'com.enonic.xp.task.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.vacuum.cfg'), "Config for 'com.enonic.xp.vacuum.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.web.dos.cfg'), "Config for 'com.enonic.xp.web.dos.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.web.header.cfg'), "Config for 'com.enonic.xp.web.header.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.web.jetty.cfg'), "Config for 'com.enonic.xp.web.jetty.cfg' should be displayed");
            assert.ok(items.includes('com.enonic.xp.web.sessionstore.cfg'),
                "Config for 'com.enonic.xp.web.sessionstore.cfg' should be displayed");
            assert.ok(items.includes('system.properties'), "Config for 'system.properties' should be displayed");

        });


    beforeEach(() => testUtils.url("http://127.0.0.1:8080/"));
    afterEach(() => testUtils.refresh());
    before(async () => {
        return console.log('specification starting: ' + this.title);
    });

});
