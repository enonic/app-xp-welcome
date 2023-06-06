import {useStore} from '@nanostores/react';
import React, {ReactNode} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Panel from '../../Panel/Panel';
import ProjectCard from '../ProjectCard/ProjectCard';

export interface Props {
    className?: string;
}

export default function ProjectsPanel({className}: Props): JSX.Element {
    const description = useI18n('projects.description');

    const {projects, urls} = useStore(config, {keys: ['projects', 'urls']});
    const cards = projects.map((project, index) => {
        return <ProjectCard key={index} project={project} xpUrl={urls.xp} csUrl={urls.contentStudio} />;
    });

    const classNames = `ProjectsPanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames} description={description}>
            {cards}
        </Panel>
    );
}
