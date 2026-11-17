import {map} from 'nanostores';

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
