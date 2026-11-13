import React from 'react';

import Icon from '../Icon/Icon';

export interface Props {
    className?: string;
}

export default function Spinner({className}: Props): JSX.Element {
    const classNames = `Spinner animate-spin ${className ?? ''}`.trim();

    return (
        <Icon className={classNames} icon='spinner' />
    );
}
