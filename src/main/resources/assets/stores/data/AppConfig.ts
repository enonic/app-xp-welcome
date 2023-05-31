export interface AppConfig {
    loggedIn: boolean;
    xpVersion: string;
    applications: WelcomeApplication[];
    sites: WelcomeSite[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
    };
    phrases: Record<string, string>;
}
