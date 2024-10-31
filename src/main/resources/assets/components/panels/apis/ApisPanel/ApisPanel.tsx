import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import EmptyHint from '../../../core/EmptyHint/EmptyHint';
import Link from '../../../core/Link/Link';
import ApiCard from '../ApiCard/ApiCard';

export interface Props {
    className?: string;
}

export default function ApisPanel({className}: Props): JSX.Element {
    const description = useI18n('apis.description');

    const classNames = `Panel ApisPanel ${className ?? ''}`.trim();

    const {apis, apiBaseUrl} = useStore(config, {keys: ['apis', 'apiBaseUrl']});

    const cards = apis.map((apiDescriptor, index) => {
        return <ApiCard key={index} apiDescriptor={apiDescriptor} apiBaseUrl={apiBaseUrl} />;
    });

    return (
        <div className={classNames}>
            {description && <h4 className='Panel-Description'>{description} <Link className='ApiCard-Link' url={apiBaseUrl}>{apiBaseUrl}</Link></h4>}
            {cards || <EmptyHint className='Panel-EmptyHint' />}
        </div>
    );
}
