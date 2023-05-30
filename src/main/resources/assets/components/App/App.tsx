import React from 'react';

import Header from '../header/Header/Header';
import AppPanels from '../panels/AppPanels/AppPanels';

import './App.css';

export default function App(): JSX.Element {
    return (
        <div className={'App theme-light'}>
            <Header />
            <AppPanels />
        </div>
    );
}
