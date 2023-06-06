export interface AppConfig {
    hasAdmin: boolean;
    loggedIn: boolean;
    vhostEnabled: boolean;
    xpVersion: string;
    applications: WebApplication[];
    sites: Site[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
        idProvider: string;
    };
    phrases: Record<string, string> | undefined;
}
