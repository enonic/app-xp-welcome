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

function goToAdmin(): void {
    window.location.href = '/admin';
}

const mod = (modifier: string, on = true): string => on ? `LoginButton_${modifier}` : '';

export default function LoginButton({className}: Props): JSX.Element {
    const {loginState} = useStore(request, {keys: ['loginState']});
    const isInProgress = loginState === RequestState.IN_PROGRESS;

    const {canLoginAsSu, loggedIn, urls} = useStore(config, {keys: ['canLoginAsSu', 'loggedIn', 'urls']});
    const idProviderUrl = urls.idProvider;

    const label = useI18n(loggedIn ?     'home.card.admin.action.open' :
                          canLoginAsSu ? 'home.card.admin.action.guest' :
                                         'home.card.admin.action.login');

    function handler(): void {
        if (!loggedIn && canLoginAsSu) {
            void login(idProviderUrl).then(loggedIn => loggedIn && goToAdmin());
        } else {
            openAdmin();
        }
    }

    const classNames = `LoginButton ${mod('login', !loggedIn)} ${className ?? ''}`.trim();

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
