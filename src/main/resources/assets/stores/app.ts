import {map} from 'nanostores';

import {AreaState} from './data/AreaState';
import {Theme} from './data/Theme';

export interface AppStore {
  theme: Theme;
  endpointsAreaState: AreaState,
}

const THEME_STORAGE_KEY = 'enonic:theme';

const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function resolveTheme(): Theme {
    let stored: string | null;
    try {
        stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        stored = null;
    }
    if (stored === Theme.LIGHT || stored === Theme.DARK) {
        return stored;
    }
    return darkSchemeQuery.matches ? Theme.DARK : Theme.LIGHT;
}

const app = map<AppStore>({
  theme: resolveTheme(),
  endpointsAreaState: AreaState.COLLAPSED,
});

export default app;

app.subscribe(({theme}) => document.documentElement.classList.toggle('dark', theme === Theme.DARK));

darkSchemeQuery.addEventListener('change', () => app.setKey('theme', resolveTheme()));
window.addEventListener('storage', () => app.setKey('theme', resolveTheme()));

export function toggleEndpointsAreaState(): void {
    const newState = app.get().endpointsAreaState === AreaState.EXPANDED ? AreaState.COLLAPSED : AreaState.EXPANDED;
    app.setKey('endpointsAreaState', newState);
}
