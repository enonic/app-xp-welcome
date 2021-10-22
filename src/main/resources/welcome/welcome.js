const admin = require('/lib/xp/admin');
const mustache = require('/lib/mustache');

function getWebApplications() {
    const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');
    return __.toNativeObject(bean.getWebApps());
}

exports.get = function (req) {
    let view = resolve('./welcome.html');
    let webApplications = getWebApplications();
    let params = {
        xpVersion: admin.getVersion(),
        applications: webApplications.applications
    };
    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };
};
