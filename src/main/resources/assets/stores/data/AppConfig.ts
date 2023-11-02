import {Application} from './Application';
import {ConfigFile} from './ConfigFile';
import {Project} from './Project';
import {Site} from './Site';

export interface AppConfig {
    canLoginAsSu: boolean;
    loggedIn: boolean;
    vhostEnabled: boolean;
    xpVersion: string;
    applications: Application[];
    configs: ConfigFile[];
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
    wsServiceUrl: string;
}
