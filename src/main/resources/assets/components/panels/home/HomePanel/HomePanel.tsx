import React, {ReactNode} from 'react';

import Panel from '../../Panel/Panel';
import EndpointsArea from '../EndpointsArea/EndpointsArea';

import './HomePanel.css';

export interface Props {
    className?: string;
}

export default function HomePanel({className}: Props): JSX.Element {
    const classNames = `HomePanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames}>
            <EndpointsArea />
        </Panel>
    );
}
