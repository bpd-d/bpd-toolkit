export declare const BPD_TOOLKIT_VERSION = "1.3.0";
/**
 * Checks if value is undefined
 * @param val value
 */
export declare function isUndefined(val: any): boolean;
/**
 * Checks if value is null
 * @param val value
 */
export declare function isNull(val: any): boolean;
/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export declare function is<T>(obj: T, typecheck?: boolean): boolean;
/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export declare function isEmpty<T>(val: T): boolean;
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export declare function are(...attributes: any[]): boolean;
/**
 * Gets promisified sleep function
 * @param timeout - timeout value in miliseconds
 */
export declare function sleep(timeout: number): Promise<boolean>;
/**
 * Clones an object
 * @param object object to clone
 */
export declare function clone(object: any): any;
/**
 * Gets value from range.
 * If value is in range then it is returned, if not then min or max is returned
 * @param value - value
 * @param min - range minimum
 * @param max - range maximum
 */
export declare function getRangeValue(value: number, min: number, max: number): number;
export declare function isInRange(value: number, min: number, max: number): boolean;
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export declare function createElementFromString(htmlString: string): Element | null;
/**
 * Creates object from JSON string
 * String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
export declare function parseJsonString(attribute: string): any | null;
/**
 * Number generator
 */
export declare function counter(): Iterator<number>;
export declare function Counter(prefix?: string): () => string;
/**
 * Checks whether property exists
 * @param obj - object
 * @param fName - property name
 */
export declare function hasProperty(obj: any, fName: string): boolean;
/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
export declare function hasFunction(obj: any, fName: string): boolean;
/**
 * Enumerate properties on the object an invokes callback for each one of them
 * @param object Object to enumarate
 * @param callback Callback to be invoked for each property
 */
export declare function enumerateObject(object: any, callback: (property: string, value: any) => void): void;
/**
 * Creates new object from passed one by calling callback for each property. Result from callback is an input for next iteration
 * @param object - input object
 * @param callback - (currentResult, propertyName, propertyValue, currentIndex) - callback for execution
 * @param initialValue - initial value of a result object
 */
export declare function reduceObject<T>(object: any, callback: (current: T, prop: string, value: any, index: number) => T, initialValue: T): T;
/**
 * Calls function after specific timeout.
 * If function is called again, timer resets
 */
export declare class Debounce {
    #private;
    constructor(callback: (...args: any[]) => void, delay: number);
    /**
     * Creates timeout ending with callback inokation, cancels current timeout
     * @param args Function args
     */
    call(...args: any[]): void;
    /**
     * Cancels current callback invokation
     */
    cancel(): void;
}
/**
 * Calls function after specific timeout.
 * If function is called again, timer resets
 */
export declare class Throttle {
    #private;
    constructor(callback: (...args: any[]) => void, delay: number);
    /**
     * Creates timeout ending with callback inokation, cancels current timeout
     * @param args Function args
     */
    call(...args: any[]): void;
    /**
     * Cancels current callback invokation
     */
    cancel(): void;
}
/**
 * Creates new function that invokes orginal one but with time limit
 * Orignal callback will not be invoked more often every time specified in second argument
 * @param callback - callback to execute
 * @param throttleTime - time in ms during which callback cannot be executed
 * @returns cancellation funtion
 */
export declare function throttle(callback: (...args: any[]) => void, throttleTime: number): (...args: any[]) => () => void;
/**
 * Block next callback executions until current finishes by returning an error if current is in progress
 * @param callback - callback to execute
 * @returns Promise that executes callback or throws error when is locked
 */
export declare function throttleAsync<T>(callback: (...args: any[]) => T): (...args: any[]) => Promise<T>;
/**
 * Debounce function - delays function execution by specfic time. Called again, break current execution and start new one
 * @param callback - callback to execute
 * @param debounceTime - time amount in ms that execution shall be delayed by
 * @returns cancellation function
 */
export declare function debounce(callback: (...args: any[]) => void, debounceTime: number): (...args: any[]) => () => void;
/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
export declare function delay(callback: (...args: any[]) => void, delayTime: number): (...args: any[]) => () => void;
/**
 * Creates function that once invoked returns a promise that executes original callback
 * @param callback Callback to execute in promise
 */
export declare function promisify<T>(callback: (...args: any[]) => T): (...args: any[]) => Promise<T>;
/**
 * Inserts new item to the collection at specific index. If index is lower than 0 then item is added at position 0, if index is bigger than collection size then item is added at the end
 * @param collection Collection of items
 * @param index position which new item should be added to - if undefined or null provided item will be inserted at last position
 * @param t new items to add
 * @returns Copy of the collection with new item inserted at specific position
 */
export declare function insert<T>(collection: T[], index: number, ...t: T[]): T[];
/**
 * Moves element or number of elements starting from index to new index
 * @param collection - base collection
 * @param from - index from
 * @param to - index to
 * @param size - ?optional - amount of items to be moved
 */
export declare function move<T>(collection: T[], from: number, to: number, size?: number): T[];
/**
 * Generates unique guid
 */
export declare function generateGuid(): string;
export interface BpdRandomStringOptions {
    threshold?: number;
    iterations?: number;
}
export declare function generateRandomString(length: number, dict: string, options?: BpdRandomStringOptions): string;
export interface BpdRandomOptions {
    min?: number;
    max?: number;
    excluded?: number[];
    limit?: number;
}
/**
 * Generates random number from given min - max range with exclusion of items provided in options.
 * Method performs recursive operation when result doesn't pass condition - max step limit can be set in options (default is 10)
 * If result cannot be found after max recursion steps then error is thrown
 * Default for min is 0, for max is 1
 * @param options (BpdRandomOptions) - min, max, excluded (array), limit (recursion)
 * @returns random number
 * @example random({min: 1, max: 3, excluded: [1.2], limit: 10})
 */
export declare function random(options?: BpdRandomOptions): Promise<number>;
/**
 * Opens element in fullscreen if possible
 * @param element dom element. For full page use document.documentElement
 */
export declare function openFullscreen(element: Element): Promise<boolean>;
/**
 * Closes fullscreen if possible
 */
export declare function closeFullscreen(): Promise<boolean>;
export declare function isFullscreen(element: Element): boolean;
/**
 * Stores number of historical elements, allows for undo and redo objects
 */
export declare class Keeper<T> {
    #private;
    constructor(limit: number);
    /**
     * Pushes element to undo list
     * @param t - element
     */
    push(t: T): void;
    /**
     * Gets latest element from undo list or undefined if list is empty
     * @param t - current item to be pushed to redo list. If empty undoed element will be pushed
     */
    undo(t?: T): T | undefined;
    /**
     * Gets latest element from redo list or undefined if list is empty
     */
    redo(): T | undefined;
    /**
     * Shrinks down undos array to size of limit - 1
     * Removes oldest entries (starting from index of 0)
     */
    shrink(): void;
}
