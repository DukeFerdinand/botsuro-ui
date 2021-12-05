export function serverSideGate<V>(val: V): V {
    if (typeof window !== "undefined") {
        throw new Error(`[env] Attempted to execute secure code in browser!`);
    }

    return val;
}
