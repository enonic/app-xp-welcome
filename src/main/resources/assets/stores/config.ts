import {map} from 'nanostores';

import {fetchAppConfig} from '../common/utils/requests';
import {AppConfig} from './data/AppConfig';

export type ConfigStore = AppConfig & {loaded: boolean};

const config = map<ConfigStore>({
    loggedIn: false,
    xpVersion: '0.0.0',
    applications: [],
    sites: [],
    urls: {
        xp: '0.0.0',
        managementApi: '',
        statisticsApi: '',
    },
    phrases: {},
    loaded: false,
});

fetchAppConfig().then(data => {
    config.set({...data, loaded: true});
}).catch(console.error);

export default config;
