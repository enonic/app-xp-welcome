import {Project} from './Project';
import {Site} from './Site';
import {WebApplication} from './WebApplication';

export interface AppConfig {
    hasAdmin: boolean;
    loggedIn: boolean;
    vhostEnabled: boolean;
    xpVersion: string;
    applications: WebApplication[];
    sites: Site[];
    projects: Project[];
    urls: {
        xp: string;
        managementApi: string;
        statisticsApi: string;
        idProvider: string;
        contentStudio?: string;
    };
    phrases: Record<string, string> | undefined;
}
