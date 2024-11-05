import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import {ApiDescriptor} from '../../../../stores/data/ApiDescriptor';
import Link from '../../../core/Link/Link';

export interface Props {
    className?: string;
    apiDescriptor: ApiDescriptor;
    apiBaseUrl: string;
}

export default function ApiCardDescription({className, apiDescriptor, apiBaseUrl}: Props): JSX.Element {
    const {description, name, application, documentationUrl, allowedPrincipals, mount} = apiDescriptor;

    const apiUrl = `${apiBaseUrl}/${apiDescriptor.descriptor}`;
    const descriptionLabel = useI18n('apis.card.description');
    const endpointLabel = useI18n('apis.card.endpoint');
    const applicationLabel = useI18n('apis.card.application');
    const nameLabel = useI18n('apis.card.name');
    const documentationLabel = useI18n('apis.card.documentation');
    const accessLabel = useI18n('apis.card.access');

    const ApiCardDescriptionRow = ({label, value}: { label: string; value: string | JSX.Element }): JSX.Element => {
        return (
            <div className='ApiCard-ExtraInfo'>
                <div className='ApiCard-ExtraInfo-Label'>{label}</div>
                <div className='ApiCard-ExtraInfo-Value'>{value}</div>
            </div>
        );
    };

    return (
        <div className={className}>
            {description && ApiCardDescriptionRow({label: descriptionLabel, value: description})}
            {mount && ApiCardDescriptionRow({label: endpointLabel, value: <Link className='ApiCard-Link' url={apiUrl}>{apiUrl}</Link>})}
            {application && ApiCardDescriptionRow({label: applicationLabel, value: application})}
            {name && ApiCardDescriptionRow({label: nameLabel, value: name})}
            {documentationUrl &&
             ApiCardDescriptionRow(
                 {label: documentationLabel, value: <Link className='ApiCard-Link' url={documentationUrl}>{documentationUrl}</Link>})}
            {allowedPrincipals && ApiCardDescriptionRow({label: accessLabel, value: allowedPrincipals.join(', ')})}
        </div>
    );
}
