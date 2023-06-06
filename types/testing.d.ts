declare global {
    interface XpLibraries {
        '/lib/xp/testing': typeof import('./testing');
    }
}

export function assertEquals(valueA: unknown, valueB: unknown): void;

export function assertNull(value: unknown): void;

export function assertNotNull(value: unknown): void;

export function assertTrue(value: unknown): void;

export function assertFalse(value: unknown): void;
