import React from 'react';

import './Slash.css';

export interface Props {
    className?: string;
}

export default function Slash({className}: Props): JSX.Element {
    const classNames = `Slash ${className ?? ''}`.trim();

    return (
        <span className={classNames}>/</span>
    );
}
