import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import Button, {ButtonType} from '../../../core/Button/Button';

import './CreateUserButton.css';

export interface Props {
    className?: string;
}

function openCreateAdmin(): void {
    window.open('/admin#createAdmin', '_blank');
}

export default function CreateUserButton({className}: Props): JSX.Element {
    const label = useI18n('home.card.admin.action.create');

    const classNames = `CreateUserButton ${className ?? ''}`.trim();

    return (
        <Button
            className={classNames}
            type={ButtonType.LINK}
            label={label}
            action={{handler: openCreateAdmin}}
        />
    );
}
