import {computed, map} from 'nanostores';

import {NavigationSegment} from './data/NavigationSegment';
import {ScreenType} from './data/ScreenType';

export interface NavigationStore {
  screen: ScreenType;
}

const navigation = map<NavigationStore>({
  screen: ScreenType.HOME,
});

navigation.setKey('screen', calcScreenFromHash());

window.addEventListener('hashchange', () => {
    navigation.setKey('screen', calcScreenFromHash());
});

export default navigation;

function calcScreenFromHash(): ScreenType {
    const {hash} = window.location;
    const screen = hash.slice(1) as ScreenType;
    return Object.values(ScreenType).includes(screen) ? screen : ScreenType.HOME;
}

export const goToScreen = (screen: ScreenType): void => {
    window.location.href = screen === ScreenType.HOME ? '#' : `#${screen}`;
};

export const setNavigationState = (state: NavigationStore): void => navigation.set(state);

export const segments = computed(navigation, ({screen}) => {
    const navSegments: NavigationSegment[] = [
        {name: window.location.origin, state: {screen: ScreenType.HOME}},
    ];

    if (screen === ScreenType.WEBAPPS) {
        navSegments.push({name: 'webapp'});
    }

    if (screen === ScreenType.PROJECTS) {
        navSegments.push({name: 'site'});
    }

    if (screen === ScreenType.SITES) {
        navSegments.push({name: 'sites'});
    }

    return navSegments;
});
