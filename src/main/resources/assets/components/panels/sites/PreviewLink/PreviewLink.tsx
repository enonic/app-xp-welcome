import React from 'react';

import {createSitePreviewUrl} from '../../../../common/utils/url';
import {useI18n} from '../../../../hooks/useI18n';
import {Branch} from '../../../../stores/data/Branch';
import Link from '../../../core/Link/Link';

import './PreviewLink.css';

export interface Props {
    className?: string;
    projectName: string;
    branch: Branch;
    sitePath: string;
}

export default function PreviewLink({className, projectName, branch, sitePath}: Props): JSX.Element {
    const url = createSitePreviewUrl(projectName, branch, sitePath);
    const label = useI18n(branch === Branch.DRAFT ? 'field.branch.draft' : 'field.branch.master');

    const classNames = `PreviewLink ${className ?? ''}`.trim();

    return (
        <Link className={classNames} url={url}>
            {label}
        </Link>
    );
}
