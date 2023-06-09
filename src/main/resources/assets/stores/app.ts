import {map} from 'nanostores';

import {AreaState} from './data/AreaState';
import {Theme} from './data/Theme';

export interface AppStore {
  theme: Theme;
  endpointsAreaState: AreaState,
}

const app = map<AppStore>({
  theme: Theme.LIGHT,
  endpointsAreaState: AreaState.COLLAPSED,
});

export default app;

export function toggleEndpointsAreaState(): void {
    const newState = app.get().endpointsAreaState === AreaState.EXPANDED ? AreaState.COLLAPSED : AreaState.EXPANDED;
    app.setKey('endpointsAreaState', newState);
}
