export interface AppConfig {
    hasAdmin: boolean;
    loggedIn: boolean;
    vhostEnabled: boolean;
    xpVersion: string;
    applications: Application[];
    sites: Site[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
        idProvider: string;
    };
    phrases: Record<string, string> | undefined;
}
