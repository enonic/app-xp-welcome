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
    const {hasAdmin} = useStore(config, {keys: ['hasAdmin']});

    const classNames = `AdminCard ${className ?? ''}`.trim();

    return (
        <Card
            className={classNames}
            title={useI18n('home.card.admin.title')}
            subtitle={':8080/admin'}
            description={useI18n('home.card.admin.description')}
        >
            <LoginButton className='AdminCard-ActionLogin' />
            {!hasAdmin && <CreateUserButton />}
        </Card>
    );
}
