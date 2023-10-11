import React from 'react';

import './Progress.css';

export interface Props {
    className?: string;
    value?: number;
}

export default function Progress({className, value}: Props): JSX.Element {
    const classNames = `Progress ${className ?? ''}`.trim();

    return (
        <div className={classNames}>
            <span style={{width: `${value || 0}%`}} />
        </div>
    );
}
