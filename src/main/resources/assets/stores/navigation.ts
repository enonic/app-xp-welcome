import {map} from 'nanostores';

import {ScreenType} from './data/ScreenType';

export interface NavigationStore {
  screen: ScreenType;
}

const navigation = map<NavigationStore>({
  screen: ScreenType.HOME,
});

export const goToScreen = (screen: ScreenType): void => navigation.setKey('screen', screen);

export default navigation;
