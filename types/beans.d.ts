declare interface XpBeans {
    'com.enonic.xp.app.welcome.WelcomePageScriptBean': {
        getWebApps: () => ({applications: Application[]});
        getSites: () => ({sites: Site[]});
        getProjects: () => ({projects: Project[]});
        getXpUrl: () => string;
        getManagementApiUrl: () => string;
        getStatisticsApiUrl: () => string;
    };
}
