import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import {RequestState} from '../../../../stores/data/RequestState';
import request, {login} from '../../../../stores/request';
import Button from '../../../core/Button/Button';
import Spinner from '../../../core/Spinner/Spinner';

import './LoginButton.css';

export interface Props {
    className?: string;
}

function openAdmin(): void {
    window.open('/admin', '_blank');
}

export default function LoginButton({className}: Props): JSX.Element {
    const {loginState} = useStore(request, {keys: ['loginState']});
    const isInProgress = loginState === RequestState.IN_PROGRESS;

    const {hasAdmin, loggedIn, urls} = useStore(config, {keys: ['hasAdmin', 'loggedIn', 'urls']});
    const idProviderUrl = urls.idProvider;

    const label = useI18n(loggedIn ? 'home.card.admin.action.open' :
                          hasAdmin ? 'home.card.admin.action.login' :
                                     'home.card.admin.action.guest');

    function handler(): void {
        if (!loggedIn && !hasAdmin) {
            login(idProviderUrl, openAdmin);
        } else {
            openAdmin();
        }
    }

    const classNames = `LoginButton ${className ?? ''}`.trim();

    return (
        <Button
            className={classNames}
            label={label}
            action={{handler}}
            disabled={!idProviderUrl || isInProgress}
        >
            {isInProgress && <Spinner className='LoginButton-Spinner' />}
        </Button>
    );
}
