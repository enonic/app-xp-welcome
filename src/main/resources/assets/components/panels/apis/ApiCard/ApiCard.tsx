import React, {useState} from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import {ApiDescriptor} from '../../../../stores/data/ApiDescriptor';
import Button, {ButtonType} from '../../../core/Button/Button';
import {CopyIcon} from '../../../core/CopyIcon/CopyIcon';
import Icomoon from '../../../core/Icomoon/Icomoon';
import Link from '../../../core/Link/Link';
import ApiCardDescription from '../ApiCardDescription/ApiCardDescription';

import './ApiCard.css';

export interface Props {
    className?: string;
    apiDescriptor: ApiDescriptor;
    apiBaseUrl: string;
}

export default function ApiCard({className, apiDescriptor, apiBaseUrl}: Props): JSX.Element {
    const classNames = `ApiCard ${className ?? ''}`.trim();

    const {descriptor, displayName, name, description, allowedPrincipals, mount} = apiDescriptor;

    const [isExpanded, setExpanded] = useState(false);

    const toggleExpanded = (): void => {
        setExpanded(!isExpanded);
    };

    const url = `${apiBaseUrl}/${descriptor}`;
    const hideLabel = useI18n('apis.card.details.hide');
    const showLabel = useI18n('apis.card.details.show');

    return (
        <div className={classNames}>
            <div className='ApiCard-Header'>
                <div className='ApiCard-HeaderRow'>
                    <div className='ApiCard-HeaderRow-LeftCol'><h2 className='ApiCard-Title'>{displayName || name}</h2></div>
                    <div className='ApiCard-HeaderRow-RightCol'>
                        {mount &&
                         <Link className='ApiCard-Link' url={url}>
                             <Icomoon className='ApiCard-LinkIcon' icon='newtab' />
                         </Link>
                        }
                    </div>
                </div>
                <div className='ApiCard-Row'>
                    <div className='ApiCard-Row__Col ApiCard-Subtitle'>
                        {descriptor}
                    </div>
                    <div className='ApiCard-Row__Col'>
                        <CopyIcon text={descriptor} />
                    </div>
                </div>
            </div>
            <div>
                <Button
                    type={ButtonType.LINK}
                    label={isExpanded ? hideLabel : showLabel}
                    action={{handler: () => toggleExpanded()}}
                />
            </div>
            {isExpanded && <ApiCardDescription apiDescriptor={apiDescriptor} apiBaseUrl={apiBaseUrl} />}
        </div>
    );
}
