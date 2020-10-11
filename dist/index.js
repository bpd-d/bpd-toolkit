(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpd-toolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpd-toolkit"] = factory();
	else
		root["bpd-toolkit"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BPD_TOOLKIT_VERSION", function() { return BPD_TOOLKIT_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "are", function() { return are; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRangeValue", function() { return getRangeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInRange", function() { return isInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElementFromString", function() { return createElementFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJsonString", function() { return parseJsonString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "counter", function() { return counter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasProperty", function() { return hasProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasFunction", function() { return hasFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumerateObject", function() { return enumerateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Debounce", function() { return Debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Throttle", function() { return Throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttleAsync", function() { return throttleAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _id, _delay, _callback, _id_1, _delay_1, _callback_1;
const BPD_TOOLKIT_VERSION = "0.1.3";
/**
 * Checks if value is undefined
 * @param val value
 */
function isUndefined(val) {
    return typeof val === 'undefined';
}
/**
 * Checks if value is null
 * @param val value
 */
function isNull(val) {
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
function is(obj, typecheck = true) {
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
function isEmpty(val) {
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
function are(...attributes) {
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
function sleep(timeout) {
    return new Promise(resolve => setTimeout(() => {
        resolve(true);
    }, timeout));
}
/**
 * Clones an object
 * @param object object to clone
 */
function clone(object) {
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
function getRangeValue(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
function isInRange(value, min, max) {
    return is(value) && value >= min && value <= max;
}
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
function createElementFromString(htmlString) {
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
function parseJsonString(attribute) {
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
function* counter() {
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
function hasProperty(obj, fName) {
    return is(obj) && is(obj[fName]);
}
/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
function hasFunction(obj, fName) {
    return is(obj[fName]) && typeof obj[fName] === 'function';
}
/**
 *
 * @param object Object to enumarate
 * @param callback Callback to be invoked for each property
 */
function enumerateObject(object, callback) {
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
class Debounce {
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
class Throttle {
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
function throttle(callback, throttleTime) {
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
function throttleAsync(callback) {
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
function debounce(callback, debounceTime) {
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
function delay(callback, delayTime) {
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map