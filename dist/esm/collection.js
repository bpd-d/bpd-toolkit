/**
 * Returns all items that pass the condition or undefined if collection is empty or callback is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Items from collection that pass the condition or undefined
 */
export function where(collection, whereFn) {
    let count = collection ? collection.length : -1;
    if (count < 1 || !whereFn) {
        return undefined;
    }
    return collection.reduce((out, item, idx) => {
        if (whereFn(item, idx, collection)) {
            out.push(item);
        }
        return out;
    }, []);
}
/**
 * Returns first item and it's index in the collection that passes the condition
 * or undefined if collection is empty or condition is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Matching item or undefined
 */
export function findFirst(collection, condition) {
    let count = collection ? collection.length : -1;
    if (count < 1 || !condition) {
        return undefined;
    }
    let idx = collection.findIndex(condition);
    if (idx < 0) {
        return undefined;
    }
    return [collection[idx], idx];
}
/**
 * Handy when argument can be either single element or an array.
 * @param t single element or array of the elements
 * @param copy? Set to true if array argument shall be copied
 * @returns array of the elements
 */
export function makeArray(t, copy) {
    if (!t) {
        return [];
    }
    if (Array.isArray(t)) {
        return copy === true ? t : [...t];
    }
    return [t];
}
/**
 * Return whether all collection elements pass condition
 * @param array
 * @param condition
 */
export function all(array, condition) {
    return array && array.length > 0 && array.find((t) => !condition(t)) === undefined;
}
