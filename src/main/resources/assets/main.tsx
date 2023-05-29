import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './components/App/App';

import './main.css';
import 'modern-normalize/modern-normalize.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
