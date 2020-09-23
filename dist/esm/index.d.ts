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
export declare function counter(): Generator<number, void, unknown>;
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
 *
 * @param object Object to enumarate
 * @param callback Callback to be invoked for each property
 */
export declare function enumerateObject(object: any, callback: (property: string, value: any) => void): void;
