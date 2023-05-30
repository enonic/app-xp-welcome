import React, {ReactNode} from 'react';

import Panel from '../../Panel/Panel';

export interface Props {
    className?: string;
}

export default function HomePanel({className}: Props): JSX.Element {
    const classNames = `HomePanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames}>
        </Panel>
    );
}
