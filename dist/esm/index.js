var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _id, _delay, _callback, _id_1, _delay_1, _callback_1, _limit, _undos, _redos;
export const BPD_TOOLKIT_VERSION = "0.1.7";
/**
 * Checks if value is undefined
 * @param val value
 */
export function isUndefined(val) {
    return typeof val === 'undefined';
}
/**
 * Checks if value is null
 * @param val value
 */
export function isNull(val) {
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
export function is(obj, typecheck = true) {
    if (!isUndefined(obj) && !isNull(obj)) {
        if (!typecheck) {
            return true;
        }
        else {
            return !isEmpty(obj);
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
export function isEmpty(val) {
    if (typeof val === "string") {
        return val.length === 0;
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0;
    }
    return false;
}
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export function are(...attributes) {
    if (!is(attributes)) {
        return false;
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
export function sleep(timeout) {
    return new Promise(resolve => setTimeout(() => {
        resolve(true);
    }, timeout));
}
/**
 * Clones an object
 * @param object object to clone
 */
export function clone(object) {
    if (!is(object)) {
        return undefined;
    }
    let type = typeof object;
    if (["number", "boolean", "string"].includes(type)) {
        return object;
    }
    if (Array.isArray(object)) {
        return [...object];
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
export function getRangeValue(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
export function isInRange(value, min, max) {
    return is(value) && value >= min && value <= max;
}
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export function createElementFromString(htmlString) {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.firstElementChild;
}
/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
export function parseJsonString(attribute) {
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
export function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0;
        }
    }
}
export function Counter(prefix) {
    const c = counter();
    return function () {
        let next = c.next().value;
        return prefix ? prefix + next : "" + next;
    };
}
/**
 * Checks whether property exists
 * @param obj - object
 * @param fName - property name
 */
export function hasProperty(obj, fName) {
    return is(obj) && is(obj[fName]);
}
/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
export function hasFunction(obj, fName) {
    return is(obj[fName]) && typeof obj[fName] === 'function';
}
/**
 * Enumerate properties on the object an invokes callback for each one of them
 * @param object Object to enumarate
 * @param callback Callback to be invoked for each property
 */
export function enumerateObject(object, callback) {
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
export function reduceObject(object, callback, initialValue) {
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
function jsonify(attribute) {
    return attribute && attribute.length > 0 ? JSON.parse(attribute) : {};
}
/**
 * Calls function after specific timeout.
 * If function is called again, timer resets
 */
export class Debounce {
    constructor(callback, delay) {
        _id.set(this, void 0);
        _delay.set(this, void 0);
        _callback.set(this, void 0);
        __classPrivateFieldSet(this, _id, null);
        __classPrivateFieldSet(this, _delay, delay);
        __classPrivateFieldSet(this, _callback, callback);
    }
    /**
     * Creates timeout ending with callback inokation, cancels current timeout
     * @param args Function args
     */
    call(...args) {
        this.cancel();
        __classPrivateFieldSet(this, _id, setTimeout(() => {
            __classPrivateFieldGet(this, _callback).call(this, ...args);
            __classPrivateFieldSet(this, _id, null);
        }, __classPrivateFieldGet(this, _delay)));
    }
    /**
     * Cancels current callback invokation
     */
    cancel() {
        if (__classPrivateFieldGet(this, _id)) {
            clearTimeout(__classPrivateFieldGet(this, _id));
            __classPrivateFieldSet(this, _id, null);
        }
    }
}
_id = new WeakMap(), _delay = new WeakMap(), _callback = new WeakMap();
/**
 * Calls function after specific timeout.
 * If function is called again, timer resets
 */
export class Throttle {
    constructor(callback, delay) {
        _id_1.set(this, void 0);
        _delay_1.set(this, void 0);
        _callback_1.set(this, void 0);
        __classPrivateFieldSet(this, _id_1, null);
        __classPrivateFieldSet(this, _delay_1, delay);
        __classPrivateFieldSet(this, _callback_1, callback);
    }
    /**
     * Creates timeout ending with callback inokation, cancels current timeout
     * @param args Function args
     */
    call(...args) {
        if (__classPrivateFieldGet(this, _id_1) === null) {
            __classPrivateFieldGet(this, _callback_1).call(this, ...args);
            __classPrivateFieldSet(this, _id_1, setTimeout(() => {
                __classPrivateFieldSet(this, _id_1, null);
            }, __classPrivateFieldGet(this, _delay_1)));
        }
    }
    /**
     * Cancels current callback invokation
     */
    cancel() {
        if (__classPrivateFieldGet(this, _id_1) !== null) {
            clearTimeout(__classPrivateFieldGet(this, _id_1));
            __classPrivateFieldSet(this, _id_1, null);
        }
    }
}
_id_1 = new WeakMap(), _delay_1 = new WeakMap(), _callback_1 = new WeakMap();
/**
 * Creates new function that invokes orginal one but with time limit
 * Orignal callback will not be invoke more often every time specified in second argument
 * @param callback - callback to execute
 * @param throttleTime - time in ms during which callback cannot be executed
 * @returns cancellation funtion
 */
export function throttle(callback, throttleTime) {
    if (!are(throttleTime, callback)) {
        throw new Error("[thorttle]: Incorrect throttle arguments");
    }
    let id = null;
    return function (...args) {
        if (id === null) {
            try {
                callback(...args);
                id = setTimeout(() => {
                    id = null;
                }, throttleTime);
            }
            catch (e) {
                id = null;
                console.log(e);
            }
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        };
    };
}
/**
 * Block next callback executions until current finishes by returning an error if current is in progress
 * @param callback - callback to execute
 * @returns Promise that executes callback or throws error when is locked
 */
export function throttleAsync(callback) {
    if (!is(callback)) {
        throw new Error("[throttleAsync]: Provided callback is incorrect");
    }
    let locked = false;
    return function (...args) {
        if (!locked) {
            locked = true;
            return new Promise((resolve, reject) => {
                try {
                    resolve(callback(...args));
                }
                catch (e) {
                    reject(e);
                }
                finally {
                    locked = false;
                }
            });
        }
        else {
            return new Promise((resolve, reject) => {
                reject(new Error("Execution is currently locked"));
            });
        }
    };
}
/**
* Debounce function - delays function execution by specfic time. Called again, break current execution and start new one
 * @param callback - callback to execute
 * @param debounceTime - time amount in ms that execution shall be delayed by
 * @returns cancellation function
 */
export function debounce(callback, debounceTime) {
    if (!are(callback, debounceTime)) {
        throw new Error("[debounce]: Input arguments are not correct");
    }
    let id = null;
    return function (...args) {
        if (id != null) {
            clearTimeout(id);
            id = null;
        }
        id = setTimeout(() => {
            callback(...args);
            id = null;
        }, debounceTime);
        return function () {
            if (id !== null) {
                clearTimeout(id);
            }
        };
    };
}
/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
export function delay(callback, delayTime) {
    if (!are(callback, delayTime)) {
        throw new Error("[delay]: Input arguments are not correct");
    }
    let id = null;
    return function (...args) {
        if (id === null) {
            id = setTimeout(() => {
                callback(...args);
                id = null;
            }, delayTime);
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        };
    };
}
/**
 * Creates function that once invoked returns a promise that executes original callback
 * @param callback Callback to execute in promise
 */
export function promisify(callback) {
    if (!is(callback)) {
        throw new Error("[promisify]: Callback is incorrect");
    }
    return function (...args) {
        return new Promise((resolve, reject) => {
            try {
                resolve(callback(...args));
            }
            catch (e) {
                reject(e);
            }
        });
    };
}
/**
 * Inserts new item to the collection at specific index. If index is lower than 0 then item is added at position 0, if index is bigger than collection size then item is added at the end
 * @param collection Collection of items
 * @param index position which new item should be added to - if undefined or null provided item will be inserted at last position
 * @param t new items to add
 * @returns Copy of the collection with new item inserted at specific position
 */
export function insert(collection, index, ...t) {
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
    return [...collection];
}
/**
 * Moves element or number of elements starting from index to new index
 * @param collection - base collection
 * @param from - index from
 * @param to - index to
 * @param size - ?optional - amount of items to be moved
 */
export function move(collection, from, to, size) {
    if (!collection || collection === null || from < 0) {
        return collection;
    }
    let amount = size !== null && size !== void 0 ? size : 1;
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
    collection.splice(newTo, 0, ...el);
    return [...collection];
}
/**
 * Stores number of historical elements, allows for undo and redo objects
 */
export class Keeper {
    constructor(limit) {
        _limit.set(this, void 0);
        _undos.set(this, void 0);
        _redos.set(this, void 0);
        __classPrivateFieldSet(this, _limit, limit);
        __classPrivateFieldSet(this, _redos, []);
        __classPrivateFieldSet(this, _undos, []);
    }
    /**
     * Pushes element to undo list
     * @param t - element
     */
    push(t) {
        let copy = clone(t);
        this.shrink();
        __classPrivateFieldGet(this, _undos).push(copy);
        __classPrivateFieldSet(this, _redos, []);
    }
    /**
     * Gets latest element from undo list or undefined if list is empty
     * @param t - current item to be pushed to redo list. If empty undoed element will be pushed
     */
    undo(t) {
        if (__classPrivateFieldGet(this, _undos).length === 0) {
            return undefined;
        }
        let copy = clone(t);
        let entry = __classPrivateFieldGet(this, _undos).pop();
        __classPrivateFieldGet(this, _redos).push(copy !== null && copy !== void 0 ? copy : entry);
        return entry;
    }
    /**
     * Gets latest element from redo list or undefined if list is empty
     */
    redo() {
        if (__classPrivateFieldGet(this, _redos).length === 0) {
            return undefined;
        }
        return __classPrivateFieldGet(this, _redos).pop();
    }
    /**
     * Shrinks down undos array to size of limit - 1
     * Removes oldest entries (starting from index of 0)
     */
    shrink() {
        let len = __classPrivateFieldGet(this, _undos).length;
        if (__classPrivateFieldGet(this, _undos).length >= __classPrivateFieldGet(this, _limit)) {
            let diff = len - __classPrivateFieldGet(this, _limit) + 1;
            __classPrivateFieldGet(this, _undos).splice(0, diff);
        }
    }
}
_limit = new WeakMap(), _undos = new WeakMap(), _redos = new WeakMap();
