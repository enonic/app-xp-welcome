import {map} from 'nanostores';

import {loginAsSu} from '../common/utils/requests';
import {RequestState} from './data/RequestState';
import {setLoggedIn} from './config';

export interface RequestStore {
    loginState: RequestState;
}

const request = map<RequestStore>({
    loginState: RequestState.DONE,
});

export default request;

export function login(url: string): void {
    if (request.get().loginState === RequestState.IN_PROGRESS) {
        return;
    }

    request.setKey('loginState', RequestState.IN_PROGRESS);
    loginAsSu(url)
        .then(loggedIn => {
            setLoggedIn(loggedIn);
            request.setKey('loginState', RequestState.DONE);
        })
        .catch(() => {
            request.setKey('loginState', RequestState.ERROR);
        });
}
