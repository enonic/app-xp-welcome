import React, {ReactNode} from 'react';

import './Link.css';

export interface Props {
    className?: string;
    url?: string;
    title?: string;
    children?: ReactNode;
}

export default function Link({className, url = '#', title, children}: Props): JSX.Element {
    const classNames = `Link ${className ?? ''}`.trim();

    return (
        <a
            className={classNames}
            href={url}
            title={title}
            rel='noreferrer'
            target='_blank'
        >
            {children}
        </a>
    );
}
