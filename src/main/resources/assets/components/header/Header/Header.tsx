import {useStore} from '@nanostores/react';
import React from 'react';

import app, {i18n} from '../../../stores/app';

import './Header.css';

export default function Header(): JSX.Element {
    const {xpVersion} = useStore(app, {keys: ['xpVersion']});

    return (
        <header className={'Header'}>
            <h1 className='Header-Title'>{i18n('header_title')}</h1>
            <p className='Header-Subtitle'>{i18n('header_subtitle', xpVersion)}</p>
        </header>
    );
}
