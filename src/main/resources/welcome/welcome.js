const auth = require('/lib/xp/auth');
const admin = require('/lib/xp/admin');
const portal = require('/lib/xp/portal');
const mustache = require('/lib/mustache');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

function getWebApplications() {
    return __.toNativeObject(bean.getWebApps());
}

function getSiteDetails() {
    return __.toNativeObject(bean.getSites());
}

exports.get = function () {
    let view = resolve('./welcome.html');
    let webApplications = getWebApplications();
    let siteDetails = getSiteDetails();

    let params = {
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
        isLoggedIn: !!auth.getUser()
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};
