import {NavigationStore} from '../navigation';

export interface NavigationSegment {
    name: string;
    state?: NavigationStore;
}
