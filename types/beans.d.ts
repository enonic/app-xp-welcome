declare interface XpBeans {
    'com.enonic.xp.app.welcome.WelcomePageScriptBean': {
        getWebApps: () => ({applications: WelcomeApplication[]});
        getSites: () => ({sites: WelcomeSite[]});
        getXpUrl: () => string;
        getManagementApiUrl: () => string;
        getStatisticsApiUrl: () => string;
    };
}
