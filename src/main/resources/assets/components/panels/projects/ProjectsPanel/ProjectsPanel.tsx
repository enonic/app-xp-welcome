import React, {ReactNode} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import Panel from '../../Panel/Panel';

export interface Props {
    className?: string;
}

export default function ProjectsPanel({className}: Props): JSX.Element {
    const description = useI18n('projects.description');

    const classNames = `ProjectsPanel ${className ?? ''}`.trim();

    return (
        <Panel
            className={classNames}
            description={description}
        >
        </Panel>
    );
}
