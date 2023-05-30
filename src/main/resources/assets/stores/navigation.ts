import {computed,map} from 'nanostores';

import {NavigationSegment} from './data/NavigationSegment';
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

export const setNavigationState = (state: NavigationStore): void => navigation.set(state);

export const segments = computed(navigation, ({screen}) => {
    const navSegments: NavigationSegment[] = [
        {name: window.location.origin, state: {screen: ScreenType.HOME}},
    ];

    if (screen === ScreenType.WEBAPPS) {
        navSegments.push({name: ScreenType.WEBAPPS});
    }

    return navSegments;
});
