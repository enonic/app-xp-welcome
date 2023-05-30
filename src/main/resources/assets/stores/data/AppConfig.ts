export interface AppConfig {
    loggedIn: boolean;
    xpVersion: string;
    application: WelcomeApplication[];
    sites: WelcomeSite[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
    };
    phrases: Record<string, string>;
}
