import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Panel from '../../Panel/Panel';
import SiteCard from '../SiteCard/SiteCard';

export interface Props {
    className?: string;
}

export default function SitesPanel({className}: Props): JSX.Element {
    const description = useI18n('sites.description');

    const {sites, urls} = useStore(config, {keys: ['sites', 'urls']});
    const cards = sites.map((site, index) => {
        return <SiteCard key={index} site={site} csUrl={urls.contentStudio} />;
    });

    const classNames = `SitesPanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames} description={description}>
            {cards}
        </Panel>
    );
}
