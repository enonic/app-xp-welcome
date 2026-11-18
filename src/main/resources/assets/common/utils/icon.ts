const SVG_DATA_URI = /^data:image\/svg\+xml[^,]*;base64,\s*(.*)$/;

const PAINT = /(?<![\w:-])(?:fill|stroke|stop-color|flood-color|lighting-color|color)\s*[=:]\s*["']?\s*([^"';)]+)/g;

const NEUTRAL_PAINTS = new Set(['none', 'currentcolor', 'inherit', 'transparent']);

const MAX_DARK_CHANNEL = 0x66;

function toDarkGrey(paint: string): string | undefined {
    if (paint === 'black') {
        return '000000';
    }

    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.exec(paint)?.[1];
    if (!hex) {
        return undefined;
    }

    const full = hex.length === 3 ? [...hex].map(c => c + c).join('') : hex;
    const [r, g, b] = [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16));

    return r === g && g === b && r <= MAX_DARK_CHANNEL ? full : undefined;
}

export function isColorableIcon(src: string): boolean {
    const base64 = SVG_DATA_URI.exec(src)?.[1];
    if (!base64) {
        return false;
    }

    let svg: string;
    try {
        svg = atob(base64).toLowerCase();
    } catch {
        return false;
    }

    if (svg.includes('<image')) {
        return false;
    }

    const paints = [...svg.matchAll(PAINT)].map(([, paint]) => paint.trim()).filter(paint => !NEUTRAL_PAINTS.has(paint));
    const greys = new Set(paints.map(toDarkGrey));

    return greys.size === 0 || (greys.size === 1 && !greys.has(undefined));
}
