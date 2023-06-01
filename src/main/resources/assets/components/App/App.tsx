import {useStore} from '@nanostores/react';
import React from 'react';

import app from '../../stores/app';
import Header from '../header/Header/Header';
import AppPanels from '../panels/AppPanels/AppPanels';

import './App.css';

export default function App(): JSX.Element {
    const {theme} = useStore(app, {keys: ['theme']});

    return (
        <div className={`App theme-${theme}`}>
            <Header />
            <AppPanels />
        </div>
    );
}
