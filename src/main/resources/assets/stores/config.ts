import merge from 'lodash.merge';
import {computed, map} from 'nanostores';

import {getWebSocketUrl} from '../common/utils/requests';
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
    configs: [],
    sites: [],
    projects: [],
    apis: [],
    apiBaseUrl: '/api',
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
    if (!document.currentScript) {
        throw Error('Legacy browsers are not supported');
    }

    const configScriptId = document.currentScript.getAttribute('data-config-script-id');
    if (!configScriptId) {
        throw Error('Unable to extract app config');
    }

    const configAsJson = document.getElementById(configScriptId)?.innerText;
    if (!configAsJson) {
        throw new Error(`Missing config in element with id '${configScriptId}'`);
    }

    const extractedConfig: AppConfig = JSON.parse(configAsJson) as AppConfig;
    const existingConfig: AppConfig = config.get();
    const existingApps = new Array(existingConfig.applications);
    if (existingApps.length > 0) {
        // applications has probably been added by websocket
        existingConfig.applications.length = 0;
        extractedConfig.applications = extractedConfig.applications.concat(...existingApps);
    }
    config.set(merge({}, existingConfig, extractedConfig));
})();

export default config;

const isWebApplication = (app: Application): app is WebApplication => app.deploymentUrl != null;

export const webapps = computed(config, ({applications}) => applications.filter(isWebApplication));

export const initialized = computed(config, ({phrases, xpVersion}) => phrases != null && xpVersion !== '0.0.0');

export const setLoggedIn = (loggedIn: boolean): void => config.setKey('loggedIn', loggedIn);
