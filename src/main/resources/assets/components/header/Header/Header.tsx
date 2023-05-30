import {useStore} from '@nanostores/react';
import React from 'react';

import {useI18n} from '../../../hooks/useI18n';
import config from '../../../stores/config';

import './Header.css';

export default function Header(): JSX.Element {
    const {xpVersion} = useStore(config, {keys: ['xpVersion']});

    const title = useI18n('header_title');
    const subtitle = useI18n('header_subtitle', xpVersion);

    return (
        <header className={'Header'}>
            <h1 className='Header-Title'>{title}</h1>
            <p className='Header-Subtitle'>{subtitle}</p>
        </header>
    );
}
