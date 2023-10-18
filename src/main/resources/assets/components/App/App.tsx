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
    action: 'remove' | undefined;
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
        shouldReconnect: (e) => {
            console.log('WebSocket connection closed.', e.code, e.reason);
            return true;
        },
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onMessage: (event) => {
            const data = JSON.parse(event.data) as WsAppData;

            if (applications) {
                const existingApp = applications.find((app) => {
                    return (data.key && app.applicationKey === data.key)
                        || (data.url && app.url === data.url);
                });
                if (existingApp) {
                    if (data.action === 'remove') {
                        applications.splice(applications.indexOf(existingApp), 1);
                        return;
                    }

                    existingApp.progress = data.progress;
                    if (data.adminToolsUrls.length > 0) {
                        existingApp.adminToolsUrls = data.adminToolsUrls;
                    }
                    if (data.icon) {
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
                        adminToolsUrls: data.adminToolsUrls || [],
                    });
                    applications.sort(function (a, b) {
                        return a.displayName.localeCompare(b.displayName);
                    });
                }
            }
        },
    };
}
