import merge from 'lodash.merge';
import {map} from 'nanostores';

import {fetchAppConfig} from '../common/utils/requests';
import {AppConfig} from './data/AppConfig';

export type ConfigStore = AppConfig;

const config = map<ConfigStore>({
    hasAdmin: false,
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
});

fetchAppConfig().then(data => {
    config.set(merge({}, config.get(), data));
}).catch(console.error);

export default config;

export const setLoggedIn = (loggedIn: boolean): void => config.setKey('loggedIn', loggedIn);
