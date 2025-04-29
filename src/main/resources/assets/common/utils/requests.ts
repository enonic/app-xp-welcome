import {AppConfig} from '../../stores/data/AppConfig';

async function get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json() as Promise<T>;
}

async function post<T>(url: string, data: Record<string, unknown> = {}): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data && JSON.stringify(data),
    });

    return await response.json() as Promise<T>;
}

export function getWebSocketUrl(): string {
    const {currentScript} = document;
    if (currentScript == null) {
        throw new Error('Legacy browsers are not supported');
    }

    return currentScript.getAttribute('data-ws-service-url') || '';
}

export async function fetchAppConfig(): Promise<AppConfig> {
    const {currentScript} = document;
    if (currentScript == null) {
        throw new Error('Legacy browsers are not supported');
    }

    const configServiceUrl = currentScript.getAttribute('data-config-service-url');
    if (configServiceUrl == null) {
        throw new Error('Unable to get the config service URL');
    }

    return await get(configServiceUrl);
}

export async function loginAsSu(idProviderUrl: string): Promise<boolean> {
    return await post<boolean>(idProviderUrl, {action: 'loginAsSu'});
}
