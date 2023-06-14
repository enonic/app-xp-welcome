import React from 'react';

import {ScreenType} from '../../../stores/data/ScreenType';
import {goToScreen} from '../../../stores/navigation';
import Button, {ButtonType} from '../../core/Button/Button';
import Icomoon from '../../core/Icomoon/Icomoon';

import './BackButton.css';

export interface Props {
    className?: string;
}

export default function BackButton({className}: Props): JSX.Element {
    const classNames = `BackButton ${className ?? ''}`.trim();

    return (
        <Button
            className={classNames}
            type={ButtonType.LINK}
            action={{handler: () => goToScreen(ScreenType.HOME)}}
        >
            <Icomoon className='BackButton-Icon' icon='keyboard_arrow_left' />
        </Button>
    );
}
