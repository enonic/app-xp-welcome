declare global {
    interface XpLibraries {
        '/lib/mustache': typeof import('./mustache');
    }
}

export function render(view: unknown, params: unknown): string;
