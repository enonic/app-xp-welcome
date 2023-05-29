declare interface XpBeans {
    'com.enonic.xp.app.welcome.WelcomePageScriptBean': {
        getWebApps: () => {
            applications: {
                key: string;
                version: string;
                displayName: string;
                url: string;
                iconAsBase64: string;
            }[];
        };
        getSites: () => {
            sites: {
                displayName: string;
                projectName: string;
                repositoryName: string;
                path: string;
                language: string;
                hasDraft: boolean;
                hasMaster: boolean;
            }[];
        };
        getXpUrl: () => string;
        getManagementApiUrl: () => string;
        getStatisticsApiUrl: () => string;
    };
}
