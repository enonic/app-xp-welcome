import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../../hooks/useI18n';
import config from '../../../../stores/config';
import Panel from '../../Panel/Panel';
import ApplicationView from '../ApplicationView/ApplicationView';

import './ApplicationsArea.css';

export interface Props {
    className?: string;
}

const mod = (modifier: string, on = true): string => on ? `ApplicationsArea_${modifier}` : '';

export default function ApplicationsArea({className}: Props): JSX.Element {
    const {applications} = useStore(config, {keys: ['applications']});
    const installedApplications = applications.map((application, index) => <ApplicationView key={index} application={application} />);
    const hasApplications = installedApplications.length > 0;

    const classNames = `ApplicationsArea ${mod('hidden', !hasApplications)} ${className ?? ''}`.trim();

    return (
        <Panel className={classNames}>
            <h2 className='ApplicationsArea-Title'>{useI18n('field.applications')}</h2>
            {installedApplications}
        </Panel>
    );
}
