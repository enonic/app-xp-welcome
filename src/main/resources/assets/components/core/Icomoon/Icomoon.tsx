import React from 'react';
import IcomoonReact from 'icomoon-react';

import icomoonSet from '../../../common/fonts/icomoon.json';

export interface Props {
    className?: string;
    icon: string;
    size?: string;
}

export default function Icomoon({className, icon, size = '1em'}: Props): JSX.Element {

    const classNames = `Icomoon ${className ?? ''}`.trim();

    return (
        <IcomoonReact
            className={classNames}
            iconSet={icomoonSet}
            size={size}
            icon={icon}
            color='currentcolor'
        />
    );
}
