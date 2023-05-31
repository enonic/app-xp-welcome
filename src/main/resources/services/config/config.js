const adminLib = require('/lib/xp/admin');
const authLib = require('/lib/xp/auth');
const i18nLib = require('/lib/xp/i18n');
const vhostLib = require('/lib/xp/vhost');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

exports.get = function () {
    const webApplications = __.toNativeObject(bean.getWebApps());
    const siteDetails = __.toNativeObject(bean.getSites());
    const phrases = i18nLib.getPhrases(adminLib.getLocales(), ['i18n/phrases']);

    return {
        status: 200,
        contentType: 'application/json',
        body: {
            loggedIn: !!authLib.getUser(),
            vhostEnabled: vhostLib.isEnabled(),
            xpVersion: adminLib.getVersion(),
            applications: webApplications.applications,
            sites: siteDetails.sites,
            urls: {
                xp: bean.getXpUrl(),
                managementApi: bean.getManagementApiUrl(),
                statisticsApi: bean.getStatisticsApiUrl(),
            },
            phrases,
        },
    };
};
