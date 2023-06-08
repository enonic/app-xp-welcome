import React from 'react';

import {Application} from '../../../../stores/data/Application';
import Img from '../../../core/Img/Img';
import Link from '../../../core/Link/Link';

import './ApplicationView.css';

export interface Props {
    className?: string;
    application: Application;
}

function getAppUrl({deploymentUrl, adminToolsUrls}: Application): string | undefined {
    if (!deploymentUrl && adminToolsUrls.length === 1) {
        return adminToolsUrls[0];
    } else if (deploymentUrl && adminToolsUrls.length === 0) {
        return deploymentUrl;
    }
    return undefined;
}

const mod = (modifier: string, on = true): string => on ? `ApplicationView_${modifier}` : '';

export default function ApplicationView({className, application}: Props): JSX.Element {
    const {icon, displayName, version} = application;

    const url = getAppUrl(application);
    const isClickable = url != null;

    const classNames = `ApplicationView ${mod('clickable', isClickable)} ${className ?? ''}`.trim();

    const children = (
        <>
            <Img className='ApplicationView-Icon' src={icon} alt='icon' />
            <h4 className='ApplicationView-Title'>{displayName}</h4>
            <p className='ApplicationView-Subtitle'>{version}</p>
        </>
    );

    return (
        isClickable ?
            <Link url={url} className={classNames}>{children}</Link> :
            <div className={classNames}>{children}</div>
    );
}
