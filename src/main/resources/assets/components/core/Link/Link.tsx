import {Link as UiLink} from '@enonic/ui';
import React, {ReactNode} from 'react';

export interface Props {
    className?: string;
    url?: string;
    title?: string;
    external?: boolean;
    children?: ReactNode;
}

export default function Link({className, url = '#', title, external = false, children}: Props): JSX.Element {
    const classNames = `Link ${className ?? ''}`.trim();

    return (
        <UiLink
            className={classNames}
            href={url}
            title={title}
            external={external}
            newTab
        >
            {children}
        </UiLink>
    );
}
