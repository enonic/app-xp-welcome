import React from 'react';

import {createCsEditUrl} from '../../../../common/utils/url';
import {useI18n} from '../../../../hooks/useI18n';
import {Site} from '../../../../stores/data/Site';
import CardWithLink from '../../../core/CardWithLink/CardWithLink';
import TextPlaceholder from '../../../core/TextPlaceholder/TextPlaceholder';
import SiteCardDescription from '../SiteCardDescription/SiteCardDescription';

import './SiteCard.css';

export interface Props {
    className?: string;
    site: Site;
    csUrl: string | undefined;
}

export default function SiteCard({className, site, csUrl}: Props): JSX.Element {
    const {id, displayName, projectName, path} = site;
    const url = csUrl && createCsEditUrl(csUrl, projectName, id);
    const defaultDisplayName = useI18n('field.unnamed');

    const classNames = `SiteCard ${className ?? ''}`.trim();

    return (
        <CardWithLink className={classNames}
            title={displayName || <TextPlaceholder text={defaultDisplayName} />}
            subtitle={`${path.replace(/^\//, '')}`}
            icon={'earth'}
            description={<SiteCardDescription site={site} />}
            link={{label: useI18n('action.openInCS'), url}}
        />
    );
}
