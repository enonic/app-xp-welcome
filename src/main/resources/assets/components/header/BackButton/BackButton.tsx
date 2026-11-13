import {IconButton} from '@enonic/ui';
import React from 'react';
import {ChevronLeft} from 'lucide-react';

import {useI18n} from '../../../hooks/useI18n';
import {ScreenType} from '../../../stores/data/ScreenType';
import {goToScreen} from '../../../stores/navigation';

import './BackButton.css';

export interface Props {
    className?: string;
}

export default function BackButton({className}: Props): JSX.Element {
    const classNames = `BackButton ${className ?? ''}`.trim();

    return (
        <IconButton
            className={classNames}
            icon={ChevronLeft}
            variant='text'
            iconSize='lg'
            aria-label={useI18n('header.home.title')}
            onClick={() => goToScreen(ScreenType.HOME)}
        />
    );
}
