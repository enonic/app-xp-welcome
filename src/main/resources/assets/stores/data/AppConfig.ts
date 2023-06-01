export interface AppConfig {
    hasAdmin: boolean;
    loggedIn: boolean;
    vhostEnabled: boolean;
    xpVersion: string;
    applications: WelcomeApplication[];
    sites: WelcomeSite[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
        idProvider: string;
    };
    phrases: Record<string, string> | undefined;
}
