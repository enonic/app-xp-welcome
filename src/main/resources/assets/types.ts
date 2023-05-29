declare type Null = null | void;

declare type FnVoid = () => void;

declare type FnAny = (...args: unknown[]) => unknown;

declare type RawDate = Date | string | number;

//
// Utility types
//
declare type Identity<T> = {[P in keyof T]: T[P]};

declare type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

declare type Replace<T, K extends keyof T, TReplace> = Identity<Pick<T, Exclude<keyof T, K>> & (T[K] extends Required<T>[K] ? {[P in K]: TReplace} : {[P in K]?: TReplace})>;

//
// Events
//
declare type CustomMouseKeyboardEvent<T extends HTMLElement = HTMLElement> = React.MouseEvent<T> | React.KeyboardEvent<T>;

declare type MouseKeyboardEvent = CustomMouseKeyboardEvent<HTMLElement>;
