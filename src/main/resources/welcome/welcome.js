const admin = require('/lib/xp/admin');
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
        sites: getSiteDetails().sites
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};
