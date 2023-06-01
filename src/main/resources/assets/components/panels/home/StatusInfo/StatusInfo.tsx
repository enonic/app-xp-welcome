import React, {ReactNode} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import {ScreenType} from '../../../../stores/data/ScreenType';
import {goToScreen} from '../../../../stores/navigation';
import CardWithButton from '../../../core/CardWithButton/CardWithButton';
import CardWithLink from '../../../core/CardWithLink/CardWithLink';
import Panel from '../../Panel/Panel';

import './StatusInfo.css';

export interface Props {
    className?: string;
    name: string;
    value: string;
}

export default function StatusInfo({className, name, value}: Props): JSX.Element {
    const classNames = `StatusInfo ${className ?? ''}`.trim();

    return (
        <span className={classNames}>
            <span className='StatusInfo-Name'>{name}</span>
            <span className='StatusInfo-Value'>{value}</span>
        </span>
    );
}
