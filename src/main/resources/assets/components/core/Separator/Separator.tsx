import React from 'react';

import './Separator.css';

export interface Props {
    className?: string;
    char?: string;
}

export default function Separator({className, char = '/'}: Props): JSX.Element {
    const classNames = `Separator ${className ?? ''}`.trim();

    return (
        <span className={classNames}>{char}</span>
    );
}
