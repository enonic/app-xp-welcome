import merge from 'lodash.merge';
import {computed, map} from 'nanostores';

import {fetchAppConfig, getWebSocketUrl} from '../common/utils/requests';
import {AppConfig} from './data/AppConfig';
import {Application} from './data/Application';
import {WebApplication} from './data/WebApplication';

export type ConfigStore = AppConfig;

const config = map<ConfigStore>({
    canLoginAsSu: false,
    loggedIn: false,
    vhostEnabled: false,
    xpVersion: '0.0.0',
    applications: [],
    sites: [],
    projects: [],
    urls: {
        xp: '0.0.0',
        managementApi: '',
        statisticsApi: '',
        idProvider: '',
    },
    phrases: undefined,
    wsServiceUrl: getWebSocketUrl(),
});

(function init(): void {
    fetchAppConfig().then(data => {
        const existingConfig = config.get();
        const existingApps = new Array(existingConfig.applications);
        if (existingApps.length > 0) {
            // applications has probably been added by websocket
            existingConfig.applications.length = 0;
            data.applications = data.applications.concat(...existingApps);
        }
        config.set(merge({}, existingConfig, data));
    }).catch(console.error);
})();

export default config;

const isWebApplication = (app: Application): app is WebApplication => app.deploymentUrl != null;

export const webapps = computed(config, ({applications}) => applications.filter(isWebApplication));

export const initialized = computed(config, ({phrases, xpVersion}) => phrases != null && xpVersion !== '0.0.0');

export const setLoggedIn = (loggedIn: boolean): void => config.setKey('loggedIn', loggedIn);
