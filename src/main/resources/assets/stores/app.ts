import {map} from 'nanostores';

import {Theme} from './data/Theme';
import {syncWithLocalStorage} from './storage';

export interface AppStore {
  theme: Theme;
}

const app = map<AppStore>({
  theme: Theme.LIGHT,
});

syncWithLocalStorage(app, 'app');

export default app;
