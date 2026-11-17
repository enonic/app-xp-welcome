import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import CreateUserButton from '../CreateUserButton/CreateUserButton';
import LoginButton from '../LoginButton/LoginButton';

import './AdminCard.css';

export interface Props {
    className?: string;
}

export default function AdminCard({className}: Props): JSX.Element {
    const {canLoginAsSu, loggedIn} = useStore(config, {keys: ['canLoginAsSu', 'loggedIn']});
    const canCreateAdmin = canLoginAsSu && !loggedIn;

    const classNames = `AdminCard ${className ?? ''}`.trim();

    return (
        <div className={classNames}>
            <div className='AdminCard-Text'>
                <h2 className='AdminCard-Title'>{useI18n('home.card.admin.title')}</h2>
                <p className='AdminCard-Description'>{useI18n('home.card.admin.description')}</p>
            </div>
            {canCreateAdmin && <CreateUserButton />}
            <LoginButton className='AdminCard-ActionLogin' />
        </div>
    );
}
