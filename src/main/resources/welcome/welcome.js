const admin = require('/lib/xp/admin');
const mustache = require('/lib/mustache');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

function getWebApplications() {
    return __.toNativeObject(bean.getWebApps());
}

exports.get = function () {
    let view = resolve('./welcome.html');
    let webApplications = getWebApplications();
    let params = {
        xpVersion: admin.getVersion(),
        applications: webApplications.applications,
        managementApiUrl: bean.getManagementApiUrl(),
        statisticsApiUrl: bean.getStatisticsApiUrl(),
        xpUrl: bean.getXpUrl(),
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};
