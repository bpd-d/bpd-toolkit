export interface CollectionConditionCallback<T> {
    (item: T, index: number, collection: T[]): boolean;
}
/**
 * Returns all items that pass the condition or undefined if collection is empty or callback is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Items from collection that pass the condition or undefined
 */
export declare function where<T>(collection: T[], whereFn: CollectionConditionCallback<T>): T[] | undefined;
/**
 * Returns first item and it's index in the collection that passes the condition
 * or undefined if collection is empty or condition is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Matching item or undefined
 */
export declare function findFirst<T>(collection: T[], condition: CollectionConditionCallback<T>): [T, number] | undefined;
