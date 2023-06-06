declare interface XpBeans {
    'com.enonic.xp.app.welcome.WelcomePageScriptBean': {
        getWebApplications: () => ({applications: WebApplication[]});
        getSites: () => ({sites: Site[]});
        getProjects: () => ({projects: Project[]});
        getXpUrl: () => string;
        getManagementApiUrl: () => string;
        getStatisticsApiUrl: () => string;
    };
}
