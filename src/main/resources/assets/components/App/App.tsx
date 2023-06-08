import {useStore} from '@nanostores/react';
import React from 'react';

import app from '../../stores/app';
import {initialized} from '../../stores/config';
import Header from '../header/Header/Header';
import AppPanels from '../panels/AppPanels/AppPanels';

import './App.css';

const mod = (modifier: string, on = true): string => on ? `App_${modifier}` : '';

export default function App(): JSX.Element {
    const {theme} = useStore(app, {keys: ['theme']});
    const isInitialized = useStore(initialized);

    return (
        <div className={`App ${mod('loading', !isInitialized)} theme-${theme}`}>
            <Header />
            <AppPanels />
        </div>
    );
}
