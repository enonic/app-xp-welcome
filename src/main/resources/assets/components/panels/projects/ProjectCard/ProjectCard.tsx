import React from 'react';

import {createHref} from '../../../../common/utils/url';
import {useI18n} from '../../../../hooks/useI18n';
import {Project} from '../../../../stores/data/Project';
import CardWithLink from '../../../core/CardWithLink/CardWithLink';

import './ProjectCard.css';

export interface Props {
    className?: string;
    project: Project;
    xpUrl: string;
    csUrl: string | undefined;
}

export default function ProjectCard({className, project, xpUrl, csUrl}: Props): JSX.Element {
    const url = csUrl && createHref(xpUrl, `${csUrl}/${project.name}`);

    const classNames = `ProjectCard ${className ?? ''}`.trim();

    return (
        <CardWithLink className={classNames}
            title={project.displayName ?? project.name}
            subtitle={`/site/${project.name}`}
            icon={project.icon}
            description={project.description}
            link={{label: useI18n('action.openInCS'), url}}
        />
    );
}
