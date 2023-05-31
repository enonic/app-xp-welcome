import {useStore} from '@nanostores/react';
import React, {ReactNode} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Button, {ButtonType} from '../../../core/Button/Button';
import Card from '../../../core/Card/Card';

import './AdminCard.css';

export interface Props {
    className?: string;
}

export default function AdminCard({className}: Props): JSX.Element {
    const {loggedIn} = useStore(config, {keys: ['loggedIn']});

    const loginLabel = useI18n(loggedIn ? 'home.card.admin.action.open' : 'home.card.admin.action.login');
    const createLabel = useI18n('home.card.admin.action.create');

    const classNames = `AdminCard ${className ?? ''}`.trim();

    return (
        <Card
            className={classNames}
            title={useI18n('home.card.admin.title')}
            subtitle={':8080/admin'}
            description={useI18n('home.card.admin.description')}
        >
            <Button
                className='AdminCard-ActionLogin'
                label={loginLabel}
                action={{handler: () => window.open('/admin', '_blank')}}
            />
            {!loggedIn &&
                <Button
                    className='AdminCard-ActionCreate'
                    type={ButtonType.LINK}
                    label={createLabel}
                    action={{handler: () => void 0}}
                />
            }
        </Card>
    );
}
