export function kebab<T, J>(array: T[], joiner: J): (T | J)[] {
    // return array.reduce((r: (T | J)[], a: T) => r.concat(a, joiner), [joiner]);
    return array.reduce((r: (T | J)[], a: T, index) => index === 0 ? r.concat(a) : r.concat(joiner, a), []);
}
