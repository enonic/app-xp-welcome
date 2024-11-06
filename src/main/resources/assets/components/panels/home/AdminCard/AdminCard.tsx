import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Card from '../../../core/Card/Card';
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
        <Card
            className={classNames}
            title={useI18n('home.card.admin.title')}
            subtitle={'/admin'}
            description={useI18n('home.card.admin.description')}
        >
            <LoginButton className='AdminCard-ActionLogin' />
            {canCreateAdmin && <CreateUserButton />}
        </Card>
    );
}
