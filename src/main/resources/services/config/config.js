const adminLib = require('/lib/xp/admin');
const authLib = require('/lib/xp/auth');
const i18nLib = require('/lib/xp/i18n');
const portalLib = require('/lib/xp/portal');
const vhostLib = require('/lib/xp/vhost');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

exports.get = function () {
    const applications = __.toNativeObject(bean.getApplications());
    const sites = __.toNativeObject(bean.getSites());
    const projects = __.toNativeObject(bean.getProjects());
    const phrases = i18nLib.getPhrases(adminLib.getLocales(), ['i18n/phrases']);

    return {
        status: 200,
        contentType: 'application/json',
        body: {
            canLoginAsSu: bean.canLoginAsSu(),
            loggedIn: !!authLib.getUser(),
            vhostEnabled: vhostLib.isEnabled(),
            xpVersion: adminLib.getVersion(),
            applications: applications.applications,
            sites: sites.sites,
            projects: projects.projects,
            urls: {
                xp: bean.getXpUrl(),
                managementApi: bean.getManagementApiUrl(),
                statisticsApi: bean.getStatisticsApiUrl(),
                idProvider: portalLib.idProviderUrl({}),
                contentStudio: bean.getContentStudioUrl(),
            },
            phrases,
        },
    };
};
