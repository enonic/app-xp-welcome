import React, {ReactNode} from 'react';

import EmptyHint from '../../core/EmptyHint/EmptyHint';

import './Panel.css';

export interface Props {
    className?: string;
    description?: string;
    children?: ReactNode;
}

export default function Panel({className, description, children}: Props): JSX.Element {
    const classNames = `Panel ${className ?? ''}`.trim();

    return (
        <div className={classNames}>
            {description && <h4 className='Panel-Description'>{description}</h4>}
            {children || <EmptyHint className='Panel-EmptyHint' />}
        </div>
    );
}
