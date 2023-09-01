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

export async function login(url: string): Promise<boolean> {
    if (request.get().loginState === RequestState.IN_PROGRESS) {
        return false;
    }

    request.setKey('loginState', RequestState.IN_PROGRESS);
    return await loginAsSu(url)
        .then(loggedIn => {
            setLoggedIn(loggedIn);
            request.setKey('loginState', RequestState.DONE);
            return loggedIn;
        })
        .catch(() => {
            request.setKey('loginState', RequestState.ERROR);
            return false;
        });
}
