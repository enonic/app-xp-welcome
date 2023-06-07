declare interface XpBeans {
    'com.enonic.xp.app.welcome.WelcomePageScriptBean': {
        getApplications: () => ({applications: Application[]});
        getSites: () => ({sites: Site[]});
        getProjects: () => ({projects: Project[]});
        getXpUrl: () => string;
        getManagementApiUrl: () => string;
        getStatisticsApiUrl: () => string;
        getContentStudioUrl: () => string;
    };
}
