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
