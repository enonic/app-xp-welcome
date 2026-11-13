import {readResolvedTheme, subscribeResolvedTheme} from '@enonic/ui-utils';
import {map} from 'nanostores';

import {AreaState} from './data/AreaState';
import {Theme} from './data/Theme';

export interface AppStore {
  theme: Theme;
  endpointsAreaState: AreaState,
}

const app = map<AppStore>({
  theme: readResolvedTheme() as Theme,
  endpointsAreaState: AreaState.COLLAPSED,
});

export default app;

app.subscribe(({theme}) => document.documentElement.classList.toggle('dark', theme === Theme.DARK));

subscribeResolvedTheme(theme => app.setKey('theme', theme as Theme));

export function toggleEndpointsAreaState(): void {
    const newState = app.get().endpointsAreaState === AreaState.EXPANDED ? AreaState.COLLAPSED : AreaState.EXPANDED;
    app.setKey('endpointsAreaState', newState);
}
