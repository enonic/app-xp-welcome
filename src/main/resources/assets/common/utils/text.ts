export function normalize(text: string): string {
    return text ? text.replaceAll(/[^a-zA-Z0-9\s]+/g, '').replaceAll(/\s+/g, '-') : text;
}
