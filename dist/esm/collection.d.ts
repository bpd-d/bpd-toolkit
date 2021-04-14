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
/**
 * Handy when argument can be either single element or an array.
 * @param t single element or array of the elements
 * @param copy? Set to true if array argument shall be copied
 * @returns array of the elements
 */
export declare function makeArray<T>(t?: T | T[], copy?: boolean): T[];
/**
 * Return whether all collection elements pass condition
 * @param array
 * @param condition
 */
export declare function all<T>(array: T[], condition: (t: T) => boolean): boolean;
