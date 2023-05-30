const admin = require('/lib/xp/admin');
const auth = require('/lib/xp/auth');
const i18nLib = require('/lib/xp/i18n');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

exports.get = function () {
    const webApplications = __.toNativeObject(bean.getWebApps());
    const siteDetails = __.toNativeObject(bean.getSites());
    const phrases = i18nLib.getPhrases(admin.getLocales(), ['i18n/phrases']);

    return {
        status: 200,
        contentType: 'application/json',
        body: {
            loggedIn: !!auth.getUser(),
            xpVersion: admin.getVersion(),
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
