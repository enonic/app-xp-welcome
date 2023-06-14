import React from 'react';

import {createHref} from '../../../../common/utils/url';
import {WebApplication} from '../../../../stores/data/WebApplication';
import Card from '../../../core/Card/Card';
import Icomoon from '../../../core/Icomoon/Icomoon';
import Link from '../../../core/Link/Link';

import './WebappCard.css';

export interface Props {
    className?: string;
    application: WebApplication;
    xpUrl: string;
}

export default function WebappCard({className, application, xpUrl}: Props): JSX.Element {
    const url = createHref(application.deploymentUrl, xpUrl);

    const classNames = `WebappCard ${className ?? ''}`.trim();

    return (
        <Card className={classNames}
            title={application.displayName}
            subtitle={application.applicationKey}
            icon={application.icon}
            description={application.description}
        >
            <Link className='WebappCard-Link' url={url}>
                <Icomoon icon='newtab' />
            </Link>
        </Card>
    );
}
