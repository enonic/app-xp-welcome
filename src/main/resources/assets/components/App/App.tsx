import {useStore} from '@nanostores/react';
import React from 'react';
import useWebSocket from 'react-use-websocket';
import {Options} from 'react-use-websocket/src/lib/types';

import app from '../../stores/app';
import config, {initialized} from '../../stores/config';
import {Application} from '../../stores/data/Application';
import Header from '../header/Header/Header';
import AppPanels from '../panels/AppPanels/AppPanels';

import './App.css';

const mod = (modifier: string, on = true): string => on ? `App_${modifier}` : '';

interface WsAppData {
    key: string;
    url: string;
    icon: string;
    displayName: string;
    description: string;
    version: string;
    taskId: string;
    progress: number;
    adminToolsUrls: string[];
}

export default function App(): JSX.Element {
    const {theme} = useStore(app, {keys: ['theme']});
    const isInitialized = useStore(initialized);
    const {wsServiceUrl, applications} = useStore(config, {keys: ['wsServiceUrl', 'applications']});

    useWebSocket(wsServiceUrl, getWebSocketOptions(applications));

    return (
        <div className={`App ${mod('loading', !isInitialized)} theme-${theme}`}>
            <Header />
            <AppPanels />
        </div>
    );
}

function getWebSocketOptions(applications: Application[]): Options {
    return {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onMessage: (event) => {
            const data = JSON.parse(event.data) as WsAppData;

            if (applications) {
                const existingApp = applications.find((app) => app.applicationKey === data.key);
                if (existingApp) {
                    existingApp.progress = data.progress;
                    if (data.progress === 100) {
                        existingApp.adminToolsUrls = data.adminToolsUrls;
                        existingApp.icon = data.icon;
                    }
                } else {
                    applications.push({
                        applicationKey: data.key,
                        version: data.version,
                        displayName: data.displayName,
                        description: data.description,
                        url: data.url,
                        icon: data.icon,
                        adminToolsUrls: [],
                    });
                    applications.sort(function (a, b) {
                        return a.displayName.localeCompare(b.displayName);
                    });
                }
            }
        },
    };
}
