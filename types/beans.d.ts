declare interface XpBeans {
    'com.enonic.xp.app.welcome.WelcomePageScriptBean': {
        canLoginAsSu: () => boolean;
        getApplications: () => ({ applications: Application[] });
        getSites: () => ({ sites: Site[] });
        getProjects: () => ({ projects: Project[] });
        getTemplateApplications: () => ({ applications: TemplateApplication[] });
        deleteTemplateFile: () => boolean;
        createConfigFile: (key: string, config: string) => string;
        installApplication: (url: string, sha: string) => string;
        getDefaultApplicationIconAsBase64: () => string;
        getInstalledApplication: (key: string) => Application;
        getXpUrl: () => string;
        getManagementApiUrl: () => string;
        getStatisticsApiUrl: () => string;
        getContentStudioUrl: () => string;
    };
}
