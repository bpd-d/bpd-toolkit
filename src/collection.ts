export interface CollectionConditionCallback<T> {
    (item: T, index: number, collection: T[]): boolean;
}

/**
 * Returns all items that pass the condition or undefined if collection is empty or callback is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Items from collection that pass the condition or undefined
 */
export function where<T>(collection: T[], whereFn: CollectionConditionCallback<T>): T[] | undefined {
    let count = collection ? collection.length : -1;
    if (count < 1 || !whereFn) {
        return undefined;
    }
    return collection.reduce<T[]>((out: T[], item: T, idx: number) => {
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
export function findFirst<T>(collection: T[], condition: CollectionConditionCallback<T>): [T, number] | undefined {
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