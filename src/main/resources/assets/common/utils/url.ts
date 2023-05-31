export function createHref(url: string | URL, base: string | URL): string {
    try {
        return new URL(base, url).href ?? '#';
    } catch (e) {
        return '#';
    }
}
