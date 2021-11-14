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

    const locales = admin.getLocales();
    log.info('Locales: ' + JSON.stringify(locales, null, 4));

    const supportedLocales = i18nLib.getSupportedLocales(['i18n/phrases']);
    log.info('Bundle locales: ' + JSON.stringify(supportedLocales, null, 4));
    const phrases = i18nLib.getPhrases(locales, ['i18n/phrases']);

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
            application: app.name
        }),
        isLoggedIn: !!auth.getUser()/*,
        i18n: {
            "page.title": phrases['page.title']
        }*/
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};
