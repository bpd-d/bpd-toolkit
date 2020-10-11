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
var _id, _delay, _callback;
export const BPD_TOOLKIT_VERSION = "0.1.2";
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
 *
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
