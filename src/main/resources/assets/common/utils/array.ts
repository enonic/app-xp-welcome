export function kebab<T, J>(array: T[], joiner: (index: number) => J): (T | J)[];
export function kebab<T, J>(array: T[], joiner: J): (T | J)[] {
    return array.reduce((r: (T | J)[], a: T, index) => {
        const j = typeof joiner === 'function' ? joiner(index) : joiner;
        return index === 0 ? r.concat(a) : r.concat(j, a);
    }, []);
}
