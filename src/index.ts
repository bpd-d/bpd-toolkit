export const BPD_TOOLKIT_VERSION = "1.0.0";
/**
 * Checks if value is undefined
 * @param val value
 */
export function isUndefined(val: any): boolean {
    return typeof val === 'undefined';
}

/**
 * Checks if value is null
 * @param val value
 */
export function isNull(val: any): boolean {
    return val === null;
}


/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export function is<T>(obj: T, typecheck: boolean = true): boolean {
    if (!isUndefined(obj) && !isNull(obj)) {
        if (!typecheck) {
            return true;
        } else {
            return !isEmpty(obj)
        }
    }
    return false;
}

/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export function isEmpty<T>(val: T): boolean {
    if (typeof val === "string") {
        return val.length === 0
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0
    }
    return false
}

/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export function are(...attributes: any[]): boolean {
    if (!is(attributes)) {
        return false
    }
    let c = attributes.length;
    for (let i = 0; i < c; i++) {
        if (!is(attributes[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Gets promisified sleep function
 * @param timeout - timeout value in miliseconds
 */
export function sleep(timeout: number): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => {
        resolve(true)
    }, timeout));
}


/**
 * Clones an object
 * @param object object to clone
 */
export function clone(object: any): any {
    if (!is(object)) {
        return undefined;
    }
    let type = typeof object;
    if (["number", "boolean", "string"].includes(type)) {
        return object;
    }
    if (Array.isArray(object)) {
        return [...object]
    }
    return Object.assign({}, object);
}


/**
 * Gets value from range.
 * If value is in range then it is returned, if not then min or max is returned
 * @param value - value
 * @param min - range minimum
 * @param max - range maximum
 */
export function getRangeValue(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}

export function isInRange(value: number, min: number, max: number): boolean {
    return is(value) && value >= min && value <= max;
}

/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export function createElementFromString(htmlString: string): Element | null {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template')
    template.innerHTML = htmlString
    return template.content.firstElementChild;
}

/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */

export function parseJsonString(attribute: string): any | null {
    let out = null;
    if (is(attribute) && attribute.startsWith('{') && attribute.endsWith('}')) {
        out = jsonify(attribute);
        return out;
    }
    return null;
}

/**
 * Number generator
 */
export function* counter(): Iterator<number> {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0
        }
    }
}

export function Counter(prefix?: string): () => string {
    const c = counter();
    return function () {
        let next = c.next().value
        return prefix ? prefix + next : "" + next;
    }
}

/**
 * Checks whether property exists
 * @param obj - object
 * @param fName - property name
 */
export function hasProperty(obj: any, fName: string) {
    return is(obj) && is(obj[fName])
}

/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
export function hasFunction(obj: any, fName: string) {
    return is(obj[fName]) && typeof obj[fName] === 'function'
}

/**
 * Enumerate properties on the object an invokes callback for each one of them
 * @param object Object to enumarate
 * @param callback Callback to be invoked for each property
 */
export function enumerateObject(object: any, callback: (property: string, value: any) => void) {
    if (!are(object, callback)) {
        return;
    }
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            callback(prop, object[prop]);
        }
    }
}

/**
 * Creates new object from passed one by calling callback for each property. Result from callback is an input for next iteration
 * @param object - input object
 * @param callback - (currentResult, propertyName, propertyValue, currentIndex) - callback for execution
 * @param initialValue - initial value of a result object
 */
export function reduceObject<T>(object: any, callback: (current: T, prop: string, value: any, index: number) => T, initialValue: T): T {
    if (!are(object, callback)) {
        return initialValue;
    }
    let result = initialValue;
    let counter = 0;
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            result = callback(result, prop, object[prop], counter);
            counter++;
        }
    }
    return result;
}

/**
 * Creates object from JSON string
 * @param attribute - JSON string
 */
function jsonify(attribute: string): any {
    return attribute && attribute.length > 0 ? JSON.parse(attribute) : {}
}

/**
 * Calls function after specific timeout.
 * If function is called again, timer resets
 */
export class Debounce {
    #id: any;
    #delay: number;
    #callback: (...args: any[]) => void;
    constructor(callback: (...args: any[]) => void, delay: number) {
        this.#id = null;
        this.#delay = delay;
        this.#callback = callback;
    }
    /**
     * Creates timeout ending with callback inokation, cancels current timeout
     * @param args Function args
     */
    call(...args: any[]) {
        this.cancel();
        this.#id = setTimeout(() => {
            this.#callback(...args);
            this.#id = null;
        }, this.#delay)
    }

    /**
     * Cancels current callback invokation
     */
    cancel() {
        if (this.#id) {
            clearTimeout(this.#id);
            this.#id = null;
        }
    }
}

/**
 * Calls function after specific timeout.
 * If function is called again, timer resets
 */
export class Throttle {
    #id: any;
    #delay: number;
    #callback: (...args: any[]) => void;
    constructor(callback: (...args: any[]) => void, delay: number) {
        this.#id = null;
        this.#delay = delay;
        this.#callback = callback;
    }
    /**
     * Creates timeout ending with callback inokation, cancels current timeout
     * @param args Function args
     */
    call(...args: any[]) {
        if (this.#id === null) {
            this.#callback(...args);
            this.#id = setTimeout(() => {
                this.#id = null;
            }, this.#delay)
        }
    }

    /**
     * Cancels current callback invokation
     */
    cancel() {
        if (this.#id !== null) {
            clearTimeout(this.#id);
            this.#id = null;
        }
    }
}


/**
 * Creates new function that invokes orginal one but with time limit
 * Orignal callback will not be invoked more often every time specified in second argument
 * @param callback - callback to execute
 * @param throttleTime - time in ms during which callback cannot be executed
 * @returns cancellation funtion
 */
export function throttle(callback: (...args: any[]) => void, throttleTime: number) {
    if (!are(throttleTime, callback)) {
        throw new Error("[thorttle]: Incorrect throttle arguments");
    }
    let id: any = null;
    return function (...args: any[]) {
        if (id === null) {
            try {
                callback(...args)
                id = setTimeout(() => {
                    id = null;
                }, throttleTime)
            } catch (e) {
                id = null;
                console.log(e);
            }
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        }
    }
}

/**
 * Block next callback executions until current finishes by returning an error if current is in progress
 * @param callback - callback to execute
 * @returns Promise that executes callback or throws error when is locked
 */
export function throttleAsync<T>(callback: (...args: any[]) => T): (...args: any[]) => Promise<T> {
    if (!is(callback)) {
        throw new Error("[throttleAsync]: Provided callback is incorrect")
    }
    let locked = false;
    return function (...args: any[]) {
        if (!locked) {
            locked = true;
            return new Promise((resolve, reject) => {
                try {
                    resolve(callback(...args));
                } catch (e) {
                    reject(e);
                } finally {
                    locked = false;
                }
            })
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Execution is currently locked"))
            })
        }
    }
}

/**
* Debounce function - delays function execution by specfic time. Called again, break current execution and start new one
 * @param callback - callback to execute
 * @param debounceTime - time amount in ms that execution shall be delayed by
 * @returns cancellation function
 */
export function debounce(callback: (...args: any[]) => void, debounceTime: number) {
    if (!are(callback, debounceTime)) {
        throw new Error("[debounce]: Input arguments are not correct")
    }
    let id: any = null;
    return function (...args: any[]) {
        if (id != null) {
            clearTimeout(id)
            id = null;
        }
        id = setTimeout(() => {
            callback(...args)
            id = null;
        }, debounceTime)
        return function () {
            if (id !== null) {
                clearTimeout(id);
            }
        }
    }
}

/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
export function delay(callback: (...args: any[]) => void, delayTime: number) {
    if (!are(callback, delayTime)) {
        throw new Error("[delay]: Input arguments are not correct")
    }
    let id: any = null;
    return function (...args: any[]) {
        if (id === null) {
            id = setTimeout(() => {
                callback(...args);
                id = null;
            }, delayTime)
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        }
    }
}

/**
 * Creates function that once invoked returns a promise that executes original callback
 * @param callback Callback to execute in promise
 */
export function promisify<T>(callback: (...args: any[]) => T): (...args: any[]) => Promise<T> {
    if (!is(callback)) {
        throw new Error("[promisify]: Callback is incorrect")
    }
    return function (...args: any[]) {
        return new Promise((resolve, reject) => {
            try {
                resolve(callback(...args))
            } catch (e) {
                reject(e);
            }
        })
    }
}


/**
 * Inserts new item to the collection at specific index. If index is lower than 0 then item is added at position 0, if index is bigger than collection size then item is added at the end
 * @param collection Collection of items
 * @param index position which new item should be added to - if undefined or null provided item will be inserted at last position
 * @param t new items to add
 * @returns Copy of the collection with new item inserted at specific position
 */
export function insert<T>(collection: T[], index: number, ...t: T[]): T[] {
    if (!collection || collection === null || !t || t === null || t.length === 0) {
        return collection;
    }
    let length = collection.length;
    // If not provided then add then treat it like last
    if (!index || index === 0 || index >= length) {
        return [...collection, ...t];
    }
    if (index <= 0) {
        return [...t, ...collection];
    }
    collection.splice(index, 0, ...t);
    return [...collection]
}

/**
 * Moves element or number of elements starting from index to new index
 * @param collection - base collection
 * @param from - index from
 * @param to - index to
 * @param size - ?optional - amount of items to be moved
 */
export function move<T>(collection: T[], from: number, to: number, size?: number): T[] {
    if (!collection || collection === null || from < 0) {
        return collection;
    }
    let amount = size ?? 1;
    let length = collection.length;
    if (length < 2 || from >= length) {
        return [...collection];
    }
    const el = collection.splice(from, amount);
    const newLength = length - amount;
    const newTo = to;
    //let newIdx = newTo < 0 ? 0 : newTo > length - amount ? length - amount : newTo;
    if (newTo <= 0) {
        return [...el, ...collection];
    }
    if (newTo >= newLength) {
        return [...collection, ...el];
    }
    collection.splice(newTo, 0, ...el)
    return [...collection];
}

/**
 * Generates unique guid
 */
export function generateGuid(): string {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

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
export async function random(options?: BpdRandomOptions): Promise<number> {
    const _min: number = Math.ceil(options?.min ?? 0);
    const _max: number = Math.floor(options?.max ?? 1);
    const _exc: number[] = options?.excluded ?? [];
    const _limit: number = Math.round(options?.limit ?? 10);
    return getRandom(_min, _max, _exc, 0, _limit);
}

/**
 * Method that generates random number
 * @param min range minimum
 * @param max range maximum
 * @param excluded exlcuded list
 * @param iteration iteration number
 * @param limit max iteration limit
 * @returns random number
 */
function getRandom(min: number, max: number, excluded: number[], iteration: number, limit: number): number {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    // Positive ending
    if (!excluded.includes(result)) {
        return result;
    }
    const newIteration = iteration++;
    if (newIteration >= limit) {
        throw new Error(`Max recursive steps limit has been reached: ${limit}`)
    }
    return getRandom(min, max, excluded, newIteration, limit);

}

/**
 * Opens element in fullscreen if possible
 * @param element dom element. For full page use document.documentElement
 */
export async function openFullscreen(element: Element): Promise<boolean> {
    if (element.requestFullscreen) {
        await element.requestFullscreen();
        return true;
    }
    let elementAny = element as any;
    if (elementAny.webkitRequestFullscreen) { /* Safari */
        await elementAny.webkitRequestFullscreen();
        return true;
    } else if (elementAny.msRequestFullscreen) { /* IE11 */
        await elementAny.msRequestFullscreen();
        return true;
    }
    return false;
}


/**
 * Closes fullscreen if possible
 */
export async function closeFullscreen(): Promise<boolean> {
    if (document.exitFullscreen) {
        await document.exitFullscreen();
        return true;
    }
    let anyDoc = document as any;
    if (anyDoc.webkitExitFullscreen) { /* Safari */
        await anyDoc.webkitExitFullscreen();
        return true;
    } else if (anyDoc.msExitFullscreen) { /* IE11 */
        await anyDoc.msExitFullscreen();
        return true;
    }
    return false;
}

export function isFullscreen(element: Element): boolean {
    if (!is(element)) {
        return false;
    }
    return element && element.clientHeight >= ((screen.availHeight || screen.height) - 30) && element.clientWidth >= ((screen.availWidth || screen.width) - 30)
}


/**
 * Stores number of historical elements, allows for undo and redo objects
 */
export class Keeper<T> {
    #limit: number;
    #undos: T[];
    #redos: T[];
    constructor(limit: number) {
        this.#limit = limit;
        this.#redos = [];
        this.#undos = [];
    }
    /**
     * Pushes element to undo list
     * @param t - element
     */
    push(t: T) {
        let copy = clone(t);
        this.shrink();
        this.#undos.push(copy);
        this.#redos = [];
    }

    /**
     * Gets latest element from undo list or undefined if list is empty
     * @param t - current item to be pushed to redo list. If empty undoed element will be pushed
     */
    undo(t?: T): T | undefined {
        if (this.#undos.length === 0) {
            return undefined;
        }
        let copy = clone(t);
        let entry = this.#undos.pop();
        this.#redos.push(copy ?? entry);
        return entry;
    }

    /**
     * Gets latest element from redo list or undefined if list is empty
     */
    redo(): T | undefined {
        if (this.#redos.length === 0) {
            return undefined;
        }
        return this.#redos.pop();
    }

    /**
     * Shrinks down undos array to size of limit - 1
     * Removes oldest entries (starting from index of 0)
     */
    shrink(): void {
        let len = this.#undos.length;
        if (this.#undos.length >= this.#limit) {
            let diff = len - this.#limit + 1;
            this.#undos.splice(0, diff);
        }
    }
}