import {useStore} from '@nanostores/react';
import React, {useEffect} from 'react';

import config from '../stores/config';

export function useWindowResize(callback: () => void): void {
    useEffect(() => {
        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
    }, [callback]);
}

export function useI18n(key: string, ...args: string[]): string {
    const {phrases} = useStore(config, {keys: ['phrases']});

    const phrase = phrases ? (phrases[key] ?? `#${key}#`) : '';
    return phrase.replace(/{(\d+)}/g, (_substring: string, ...replaceArgs: number[]) => args[replaceArgs[0]]).trim();
}
