import React from 'react';

import {Application} from '../../../../stores/data/Application';
import Img from '../../../core/Img/Img';
import Link from '../../../core/Link/Link';
import Progress from '../../../core/Progress/Progress';

import './ApplicationView.css';

export interface Props {
    className?: string;
    application: Application;
}

function getAppUrl({adminToolsUrls}: Application): string | undefined {
    if (adminToolsUrls.length === 1) {
        return adminToolsUrls[0];
    }
    return undefined;
}

const mod = (modifier: string, on = true): string => on ? `ApplicationView_${modifier}` : '';

export default function ApplicationView({className, application}: Props): JSX.Element {
    const {icon, displayName, version, progress} = application;

    const url = getAppUrl(application);
    const isClickable = url != null;
    const isInstalling = !!progress && progress < 100;

    const classNames = `ApplicationView ${mod('clickable', isClickable)} ${mod('installing', isInstalling)} ${className ?? ''}`.trim();

    const children = (
        <>
            <Img className='ApplicationView-Icon' src={icon} alt='icon' />
            <h4 className='ApplicationView-Title'>{displayName}</h4>
            <p className='ApplicationView-Subtitle'>{version}</p>
            <Progress className='ApplicationView-Progress' value={progress} />
        </>
    );

    return (
        isClickable ?
            <Link url={url} className={classNames}>{children}</Link> :
            <div className={classNames}>{children}</div>
    );
}
