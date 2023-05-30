declare interface WelcomeApplication {
    key: string;
    version: string;
    displayName: string;
    url: string;
    iconAsBase64: string;
}

declare interface WelcomeSite {
    displayName: string;
    projectName: string;
    repositoryName: string;
    path: string;
    language: string;
    hasDraft: boolean;
    hasMaster: boolean;
}

declare interface WelcomeConfig {
    xpVersion: string;
    applications: WelcomeApplication[];
    managementApiUrl: string;
    statisticsApiUrl: string;
    xpUrl: string;
    sites: WelcomeSite[];
    assetsUri: string;
    isLoggedIn: boolean;
    phrases: Record<string, string>;
}

declare const CONFIG: WelcomeConfig;
