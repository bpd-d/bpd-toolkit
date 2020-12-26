// Generated by dts-bundle v0.7.3

export const BPD_TOOLKIT_VERSION = "0.1.8";
/**
    * Checks if value is undefined
    * @param val value
    */
export function isUndefined(val: any): boolean;
/**
    * Checks if value is null
    * @param val value
    */
export function isNull(val: any): boolean;
/**
    * Checks if value is defined an is not null
    * Additionally with type check it can check value if it is not empty string or collection or object
    *
    * @param val - value
    * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
    * @returns whether value passed all conditions
    */
export function is<T>(obj: T, typecheck?: boolean): boolean;
/**
    * Checks if value is empty string, array or object
    *
    *
    * @param val - value
    * @returns whether value passed all conditions
    */
export function isEmpty<T>(val: T): boolean;
/**
    * Verifies whether attributes exist and have some values
    * @param attributes attributes list
    */
export function are(...attributes: any[]): boolean;
/**
    * Gets promisified sleep function
    * @param timeout - timeout value in miliseconds
    */
export function sleep(timeout: number): Promise<boolean>;
/**
    * Clones an object
    * @param object object to clone
    */
export function clone(object: any): any;
/**
    * Gets value from range.
    * If value is in range then it is returned, if not then min or max is returned
    * @param value - value
    * @param min - range minimum
    * @param max - range maximum
    */
export function getRangeValue(value: number, min: number, max: number): number;
export function isInRange(value: number, min: number, max: number): boolean;
/**
    * Creates proper html element from given string
    * @param htmlString - string containing html
    */
export function createElementFromString(htmlString: string): Element | null;
/**
    * Creates object from JSON string
 * String must start with { and end with }
    *
    * @param attribute - attribute value
    * @returns object if string passes test, null otherwise
    */
export function parseJsonString(attribute: string): any | null;
/**
    * Number generator
    */
export function counter(): Generator<number, void, unknown>;
export function Counter(prefix?: string): () => string;
/**
    * Checks whether property exists
    * @param obj - object
    * @param fName - property name
    */
export function hasProperty(obj: any, fName: string): boolean;
/**
    * Checks whether property exists on the object and it is a function
    * @param obj - object
    * @param fName - property name
    */
export function hasFunction(obj: any, fName: string): boolean;
/**
    * Enumerate properties on the object an invokes callback for each one of them
    * @param object Object to enumarate
    * @param callback Callback to be invoked for each property
    */
export function enumerateObject(object: any, callback: (property: string, value: any) => void): void;
/**
    * Creates new object from passed one by calling callback for each property. Result from callback is an input for next iteration
    * @param object - input object
    * @param callback - (currentResult, propertyName, propertyValue, currentIndex) - callback for execution
    * @param initialValue - initial value of a result object
    */
export function reduceObject<T>(object: any, callback: (current: T, prop: string, value: any, index: number) => T, initialValue: T): T;
/**
    * Calls function after specific timeout.
    * If function is called again, timer resets
    */
export class Debounce {
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
export class Throttle {
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
    * Orignal callback will not be invoke more often every time specified in second argument
    * @param callback - callback to execute
    * @param throttleTime - time in ms during which callback cannot be executed
    * @returns cancellation funtion
    */
export function throttle(callback: (...args: any[]) => void, throttleTime: number): (...args: any[]) => () => void;
/**
    * Block next callback executions until current finishes by returning an error if current is in progress
    * @param callback - callback to execute
    * @returns Promise that executes callback or throws error when is locked
    */
export function throttleAsync<T>(callback: (...args: any[]) => T): (...args: any[]) => Promise<T>;
/**
 * Debounce function - delays function execution by specfic time. Called again, break current execution and start new one
    * @param callback - callback to execute
    * @param debounceTime - time amount in ms that execution shall be delayed by
    * @returns cancellation function
    */
export function debounce(callback: (...args: any[]) => void, debounceTime: number): (...args: any[]) => () => void;
/**
    * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
    * @param callback - callback to execute
    * @param delayTime - time in ms that execution shall be delayed by
    * @returns Cancel callback
    */
export function delay(callback: (...args: any[]) => void, delayTime: number): (...args: any[]) => () => void;
/**
    * Creates function that once invoked returns a promise that executes original callback
    * @param callback Callback to execute in promise
    */
export function promisify<T>(callback: (...args: any[]) => T): (...args: any[]) => Promise<T>;
/**
    * Inserts new item to the collection at specific index. If index is lower than 0 then item is added at position 0, if index is bigger than collection size then item is added at the end
    * @param collection Collection of items
    * @param index position which new item should be added to - if undefined or null provided item will be inserted at last position
    * @param t new items to add
    * @returns Copy of the collection with new item inserted at specific position
    */
export function insert<T>(collection: T[], index: number, ...t: T[]): T[];
/**
    * Moves element or number of elements starting from index to new index
    * @param collection - base collection
    * @param from - index from
    * @param to - index to
    * @param size - ?optional - amount of items to be moved
    */
export function move<T>(collection: T[], from: number, to: number, size?: number): T[];
/**
    * Opens element in fullscreen if possible
    * @param element dom element. For full page use document.documentElement
    */
export function openFullscreen(element: Element): void;
/**
    * Closes fullscreen if possible
    */
export function closeFullscreen(): void;
/**
    * Stores number of historical elements, allows for undo and redo objects
    */
export class Keeper<T> {
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

