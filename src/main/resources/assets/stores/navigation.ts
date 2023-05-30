import {map} from 'nanostores';

import {ScreenType} from './data/ScreenType';
import {syncWithSessionStorage} from './storage';

export interface NavigationStore {
  screen: ScreenType;
}

const navigation = map<NavigationStore>({
  screen: ScreenType.HOME,
});

syncWithSessionStorage(navigation, 'navigation');

export default navigation;

export const goToScreen = (screen: ScreenType): void => navigation.setKey('screen', screen);
