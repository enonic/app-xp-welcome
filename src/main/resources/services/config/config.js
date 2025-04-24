const adminLib = require('/lib/xp/admin');
const authLib = require('/lib/xp/auth');
const i18nLib = require('/lib/xp/i18n');
const portalLib = require('/lib/xp/portal');
const vhostLib = require('/lib/xp/vhost');

const bean = __.newBean('com.enonic.xp.app.welcome.WelcomePageScriptBean');

exports.get = function (req) {
    const applications = __.toNativeObject(bean.getApplications());
    const sites = __.toNativeObject(bean.getSites());
    const projects = __.toNativeObject(bean.getProjects());
    const configs = __.toNativeObject(bean.getConfigs());
    const apiDescriptors = __.toNativeObject(bean.getApis());
    const phrases = i18nLib.getPhrases(req.locales, ['i18n/phrases']);

    return {
        status: 200,
        contentType: 'application/json',
        body: {
            canLoginAsSu: bean.canLoginAsSu(),
            loggedIn: !!authLib.getUser(),
            vhostEnabled: vhostLib.isEnabled(),
            xpVersion: adminLib.getVersion(),
            applications: applications.applications,
            configs: configs.configs,
            sites: sites.sites,
            projects: projects.projects,
            apis: apiDescriptors,
            apiBaseUrl: bean.getApiBaseUrl(),
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
