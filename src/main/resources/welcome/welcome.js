const auth = require('/lib/xp/auth');
const admin = require('/lib/xp/admin');
const portal = require('/lib/xp/portal');
const i18nLib = require('/lib/xp/i18n');
const mustache = require('/lib/mustache');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

function getWebApplications() {
    return __.toNativeObject(bean.getWebApps());
}

function getSiteDetails() {
    return __.toNativeObject(bean.getSites());
}
exports.get = function () {
    const view = resolve('./welcome.html');
    const webApplications = getWebApplications();
    const siteDetails = getSiteDetails();

    const phrases = i18nLib.getPhrases(admin.getLocales(), ['i18n/phrases']);

    const params = {
        xpVersion: admin.getVersion(),
        applications: webApplications.applications,
        managementApiUrl: bean.getManagementApiUrl(),
        statisticsApiUrl: bean.getStatisticsApiUrl(),
        xpUrl: bean.getXpUrl(),
        hasSites: siteDetails.sites.length > 0,
        hasApplications: webApplications.applications.length > 0,
        sites: siteDetails.sites,
        assetsUri: portal.assetUrl({
            path: '',
            application: app.name,
        }),
        isLoggedIn: !!auth.getUser(),
        phrases,
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params),
    };
};
