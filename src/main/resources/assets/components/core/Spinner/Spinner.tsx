import React from 'react';

import Icomoon from '../Icomoon/Icomoon';

import './Spinner.css';

export interface Props {
    className?: string;
}

export default function Spinner({className}: Props): JSX.Element {
    const classNames = `Spinner effect-spin ${className ?? ''}`.trim();

    return (
        <Icomoon className={classNames} icon='spinner' />
    );
}
