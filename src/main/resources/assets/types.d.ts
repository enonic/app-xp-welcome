declare global {
    type Null = null | void;

    type FnVoid = () => void;

    type FnAny = (...args: unknown[]) => unknown;

    type RawDate = Date | string | number;

    //
    // Utility types
    //
    type Identity<T> = {[P in keyof T]: T[P]};

    type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

    type Replace<T, K extends keyof T, TReplace> = Identity<Pick<T, Exclude<keyof T, K>> & (T[K] extends Required<T>[K] ? {[P in K]: TReplace} : {[P in K]?: TReplace})>;
}

export {};
