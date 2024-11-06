import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../hooks/useI18n';
import config from '../../../stores/config';
import {ScreenType} from '../../../stores/data/ScreenType';
import navigation from '../../../stores/navigation';
import Button from '../../core/Button/Button';
import Icomoon from '../../core/Icomoon/Icomoon';
import BackButton from '../BackButton/BackButton';
import Navigator from '../Navigator/Navigator';

import './Header.css';

function createHeaderTitlePhrase(screen: ScreenType): string {
    switch (screen) {
        case ScreenType.HOME:
            return 'header.home.title';
        case ScreenType.PROJECTS:
            return 'header.projects.title';
        case ScreenType.WEBAPPS:
            return 'header.webapps.title';
        case ScreenType.SITES:
            return 'header.sites.title';
        case ScreenType.APIS:
            return 'header.apis.title';
    }
}

export default function Header(): JSX.Element {
    const {screen} = useStore(navigation, {keys: ['screen']});
    const {xpVersion} = useStore(config, {keys: ['xpVersion']});

    const isHome = screen === ScreenType.HOME;

    const title = useI18n(createHeaderTitlePhrase(screen));
    const subtitle = useI18n('header.subtitle', xpVersion);

    return (
        <header className={'Header'}>
            {isHome || <BackButton />}
            <h1 className='Header-Title'>{title}</h1>
            {isHome && <p className='Header-Subtitle'>{subtitle}</p>}
        </header>
    );
}
