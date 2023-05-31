import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Panel from '../../Panel/Panel';
import WebappCard from '../WebappCard/WebappCard';

export interface Props {
    className?: string;
}

export default function WebappsPanel({className}: Props): JSX.Element {
    const description = useI18n('webapps.description');

    const {applications, urls} = useStore(config, {keys: ['applications', 'urls']});
    const webapps = applications.map((app, index) => <WebappCard key={index} application={app} xpUrl={urls.xp} />);

    const classNames = `WebappsPanel ${className ?? ''}`.trim();

    return (
        <Panel className={classNames} description={description}>
            {webapps}
        </Panel>
    );
}
