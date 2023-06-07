import React from 'react';

import {createCsBrowseUrl, createHref} from '../../../../common/utils/url';
import {useI18n} from '../../../../hooks/useI18n';
import {Project} from '../../../../stores/data/Project';
import CardWithLink from '../../../core/CardWithLink/CardWithLink';
import TextPlaceholder from '../../../core/TextPlaceholder/TextPlaceholder';

import './ProjectCard.css';

export interface Props {
    className?: string;
    project: Project;
    csUrl: string | undefined;
}

export default function ProjectCard({className, project, csUrl}: Props): JSX.Element {
    const {name, displayName, description} = project;
    const url = csUrl && createCsBrowseUrl(csUrl, name);
    const defaultDisplayName = useI18n('field.unnamed');

    const classNames = `ProjectCard ${className ?? ''}`.trim();

    return (
        <CardWithLink className={classNames}
            title={displayName || <TextPlaceholder text={defaultDisplayName} />}
            subtitle={`/site/${name}`}
            icon={project.icon}
            description={description}
            link={{label: useI18n('action.openInCS'), url}}
        />
    );
}
