export function createHref(url: string | URL, base: string | URL): string {
    try {
        return new URL(base, url).href ?? '#';
    } catch (e) {
        return '#';
    }
}

export function changeOriginPort(port: number): string {
    return window.location.origin.replace(/:\d+/, `:${port}`);
}
