import {useStore} from '@nanostores/react';
import React, {useState} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Button, {ButtonType} from '../../../core/Button/Button';
import EmptyHint from '../../../core/EmptyHint/EmptyHint';
import Link from '../../../core/Link/Link';
import ApiCard from '../ApiCard/ApiCard';

import './ApisPanel.css';

export interface Props {
    className?: string;
}

export default function ApisPanel({className}: Props): JSX.Element {
    const description = useI18n('apis.description');

    const classNames = `Panel ApisPanel ${className ?? ''}`.trim();

    const {apis, apiBaseUrl} = useStore(config, {keys: ['apis', 'apiBaseUrl']});

    const [isShowAll, setShowAll] = useState(false);

    const toggleShowAllow = (): void => {
        setShowAll(!isShowAll);
    };

    const cards = apis.filter(apiDescriptor => isShowAll ? true : apiDescriptor.mount.length > 0).map((apiDescriptor, index) => {
        return <ApiCard key={index} apiDescriptor={apiDescriptor} apiBaseUrl={apiBaseUrl} />;
    });

    const showAllLabel = useI18n('apis.panel.showAll');
    const showOnlyMountedLabel = useI18n('apis.panel.showOnlyMounted');

    return (
        <div>
            <div className='ApiPanel-Row'>
                <div className='ApiPanel-Row__Col'>
                    {description &&
                     <h4 className='Panel-Description'>{description} <Link className='ApiCard-Link' url={apiBaseUrl}>{apiBaseUrl}</Link>
                     </h4>}
                </div>
                <div className='ApiPanel-Row__Col RightAligned'>
                    <Button
                        type={ButtonType.LINK}
                        label={isShowAll ? showOnlyMountedLabel : showAllLabel}
                        action={{handler: () => toggleShowAllow()}}
                    />
                </div>
            </div>
            <div className={classNames}>
                {cards || <EmptyHint className='Panel-EmptyHint' />}
            </div>
        </div>
    );
}
