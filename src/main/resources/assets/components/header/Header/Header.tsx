import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../hooks/useI18n';
import config from '../../../stores/config';
import {ScreenType} from '../../../stores/data/ScreenType';
import navigation from '../../../stores/navigation';
import Navigator from '../Navigator/Navigator';

import './Header.css';

export default function Header(): JSX.Element {
    const {screen} = useStore(navigation, {keys: ['screen']});
    const {xpVersion} = useStore(config, {keys: ['xpVersion']});

    const isHome = screen === ScreenType.HOME;

    const title = useI18n('header.title');
    const subtitle = useI18n('header.subtitle', xpVersion);

    return (
        <header className={'Header'}>
            <h1 className='Header-Title'>{title}</h1>
            {isHome ?
                <p className='Header-Subtitle'>{subtitle}</p> :
                <Navigator className='Header-Navigator' />
            }
        </header>
    );
}
