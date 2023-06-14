import {Branch} from '../../stores/data/Branch';

export function createHref(url: string | URL, base?: string | URL): string {
    try {
        return new URL(url, base ?? window.location.origin).href ?? '#';
    } catch (e) {
        return '#';
    }
}

export function changeOriginPort(port: number): string {
    return window.location.origin.replace(/:\d+/, `:${port}`);
}

export function createCsBrowseUrl(csUrl: string, projectName: string): string {
    return createHref(`${csUrl}#/${projectName}/browse`);
}

export function createCsEditUrl(csUrl: string, projectName: string, contentId: string): string {
    return createHref(`${csUrl}/${projectName}/edit/${contentId}`);
}

export function createSitePreviewUrl(project: string, branch: Branch, sitePath: string): string {
    return createHref(`admin/site/preview/${project}/${branch}${sitePath}`);
}

export function isInternalUrl(url: string): boolean {
    return url.startsWith(window.location.origin) || url.startsWith('/') || url.startsWith('#');
}
