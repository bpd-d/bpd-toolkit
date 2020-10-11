// Generated by dts-bundle v0.7.3

export const BPD_TOOLKIT_VERSION = "0.1.2";
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
    *
    * @param object Object to enumarate
    * @param callback Callback to be invoked for each property
    */
export function enumerateObject(object: any, callback: (property: string, value: any) => void): void;
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

