
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import {Branch} from '../../../../stores/data/Branch';
import {Site} from '../../../../stores/data/Site';
import Separator from '../../../core/Separator/Separator';
import PreviewLink from '../PreviewLink/PreviewLink';

import './SiteCardDescription.css';

export interface Props {
    className?: string;
    site: Site;
}

export default function SiteCardDescription({className, site}: Props): JSX.Element {
    const {projectName, path, hasMaster} = site;
    const notPublishedText = useI18n('field.notPublished');

    const classNames = `SiteCardDescription ${className ?? ''}`.trim();

    return (
        <p className={classNames}>
            <PreviewLink projectName={projectName} branch={Branch.DRAFT} sitePath={path} />
            <Separator char='|' />
            {hasMaster ?
                <PreviewLink projectName={projectName} branch={Branch.MASTER} sitePath={path} /> :
                <span>{notPublishedText}</span>
            }
        </p>
    );
}
