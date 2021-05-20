(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["validator"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "equal": () => (/* binding */ equal),
/* harmony export */   "ofType": () => (/* binding */ ofType),
/* harmony export */   "validateSingleValue": () => (/* binding */ validateSingleValue),
/* harmony export */   "validate": () => (/* binding */ validate),
/* harmony export */   "schema": () => (/* binding */ schema),
/* harmony export */   "field": () => (/* binding */ field)
/* harmony export */ });
// Errors
class ValidateFunctionError extends Error {
    constructor(fname, message) {
        super(`Error in function: ${fname}: ${message}`);
        this.name = "ValidateFunctionError";
    }
}
// Helper functions
function getLength(obj) {
    if (typeof obj === "number") {
        return obj;
    }
    if (obj["length"] && typeof obj["length"] === "number") {
        return obj["length"];
    }
    return parseInt(obj);
}
function isExist(obj) {
    return typeof obj !== "undefined" && obj !== null;
}
function validationErrorHelper(prop) {
    const validationError = {
        prop: prop,
        steps: [],
    };
    return {
        add: (name, message) => {
            validationError.steps.push({ name, message });
        },
        get: () => {
            return validationError.steps.length === 0
                ? undefined
                : validationError;
        },
    };
}
function validationResultsHelper(init) {
    const validationRes = {
        result: true,
        data: init,
    };
    return {
        add: (error) => {
            if (!validationRes.errors) {
                validationRes.errors = [];
            }
            validationRes.result = false;
            validationRes.errors.push(error);
        },
        setProp: (prop, value) => {
            if (!validationRes.data)
                return;
            validationRes.data[prop] = value;
        },
        get: () => {
            if (!validationRes.result) {
                validationRes.data = undefined;
            }
            return validationRes;
        },
    };
}
function parseSchemaStructure(schema) {
    const result = {};
    for (let prop in schema) {
        result[prop] = parseFieldStructure(schema[prop]);
    }
    return result;
}
function parseFieldStructure(fieldDef) {
    const callbacks = [];
    for (let field in fieldDef) {
        const callback = getCallbackForField(field, fieldDef[field]);
        if (callback) {
            callbacks.push(callback);
        }
    }
    return callbacks;
}
function getCallbackForField(field, value) {
    switch (field) {
        case "min":
            return min(value);
        case "max":
            return max(value);
        case "equal":
            return equal(value);
        case "match":
            return match(value);
        case "type":
            return ofType(value);
        case "compare":
            return compare(value);
        case "range": {
            if (!Array.isArray(value) || value.length < 2) {
                return undefined;
            }
            return range(value[0], value[1]);
        }
        case "custom": {
            if (value && value["name"] && value["callback"]) {
                return value;
            }
            return undefined;
        }
        default:
            return undefined;
    }
}
function exists(message) {
    return {
        name: "exists",
        failMessage: message !== null && message !== void 0 ? message : "Does not exist",
        callback: (obj) => {
            return isExist(obj);
        },
    };
}
/**
 * Validator callbacks
 */
/**
 * Check whether value (or length) is larger or equal to comapre
 * @param minVal value to comapre with current field
 * @param message
 * @returns
 */
function min(minVal, message) {
    if (typeof minVal !== "number") {
        throw new ValidateFunctionError("min", "Input param is incorrect");
    }
    return {
        name: "min",
        failMessage: message !== null && message !== void 0 ? message : "Is lesser than " + minVal,
        callback: (obj) => {
            return getLength(obj) >= minVal;
        },
    };
}
/**
 * Check whether value (or length) is smaller or equal to value
 * @param maxVal - value to compare current field with
 * @param message
 * @returns
 */
function max(maxVal, message) {
    if (typeof maxVal !== "number") {
        throw new ValidateFunctionError("max", "Input param is incorrect");
    }
    return {
        name: "max",
        failMessage: message !== null && message !== void 0 ? message : "Is greater than " + maxVal,
        callback: (obj) => {
            return getLength(obj) <= maxVal;
        },
    };
}
/**
 * Compares whether values of two fields are equal
 * @param fieldName field to compare with current
 * @param message
 * @returns
 */
function compare(fieldName, message) {
    if (typeof fieldName !== "string") {
        throw new ValidateFunctionError("compare", "Input param is incorrect");
    }
    return {
        name: "compare",
        failMessage: message !== null && message !== void 0 ? message : "Is different than " + fieldName,
        callback: (obj, name, parent) => {
            return parent[fieldName] === obj;
        },
    };
}
/**
 * Checks if value is within the range (for strings and array length is compared)
 * @param {Number} minVal - minmum range value
 * @param {Number} maxVal - max range value
 * @param {String} message
 * @returns
 */
function range(minVal, maxVal, message) {
    if (typeof maxVal !== "number" || typeof minVal !== "number") {
        throw new ValidateFunctionError("range", "Incorrect input params");
    }
    if (minVal >= maxVal) {
        throw new ValidateFunctionError("range", "Incorrect range provided");
    }
    return {
        name: "range",
        failMessage: message !== null && message !== void 0 ? message : `Doesn't match range ${minVal} and ${maxVal}`,
        callback: (obj) => {
            const len = getLength(obj);
            return len >= minVal && len <= maxVal;
        },
    };
}
/**
 * Matches field value with compare string or regex
 * @param {String | RegExp} compare
 * @param {String} message
 * @returns
 */
function match(compare, message) {
    return {
        name: "match",
        failMessage: message !== null && message !== void 0 ? message : `Doesn't match to ${compare}`,
        callback: (obj) => {
            if (!obj) {
                return false;
            }
            const result = typeof obj === "string"
                ? obj.match(compare)
                : obj.toString().match(compare);
            return result !== null && result.length > 0;
        },
    };
}
/**
 * Checks if field value equals to compare
 * @param {any} compare Value to compore field with
 * @param {String} message
 * @returns
 */
function equal(compare, message) {
    return {
        name: "equal",
        failMessage: message !== null && message !== void 0 ? message : "Does not equal to " + compare,
        callback: (obj) => {
            return Object.is(obj, compare);
        },
    };
}
/**
 * Check if field value is of expected type
 * @param {String} typeString - exprected type of the field
 * @param {String} message
 * @returns
 */
function ofType(typeString, message) {
    return {
        name: "ofType",
        failMessage: message !== null && message !== void 0 ? message : "Type doesn't match to " + typeString,
        callback: (obj) => {
            return typeof obj === typeString;
        },
    };
}
////////////////////////////////
function validateSingleValue(prop, value, parent, callbacks, options) {
    const helper = validationErrorHelper(prop);
    const shallContinue = options === null || options === void 0 ? void 0 : options.checkAll;
    const validators = [exists(), ...callbacks];
    const vLen = validators.length;
    for (let i = 0; i < vLen; i++) {
        const validator = validators[i];
        try {
            if (!validator.callback(value, prop, parent)) {
                helper.add(validator.name, validator.failMessage);
                if (!shallContinue)
                    break;
            }
        }
        catch (err) {
            helper.add(validator.name, `[Validator failure] ${err.message}`);
            if (!shallContinue)
                break;
        }
    }
    const fin = helper.get();
    return {
        result: fin === undefined,
        error: fin,
    };
}
function validate(object, schema, options) {
    const helper = validationResultsHelper();
    for (let prop in schema) {
        const value = object[prop];
        const singleRes = validateSingleValue(prop, value, object, schema[prop], options);
        if (singleRes.result) {
            helper.setProp(prop, value);
        }
        else {
            if (singleRes.error)
                helper.add(singleRes.error);
            if (!(options === null || options === void 0 ? void 0 : options.checkAll)) {
                break;
            }
        }
    }
    return helper.get();
}
function schema(schemaStructure) {
    const schema = schemaStructure
        ? parseSchemaStructure(schemaStructure)
        : {};
    const builder = {
        set: (name, ...callbacks) => {
            schema[name] = callbacks;
            return builder;
        },
        define: (...fields) => {
            fields.forEach((field) => {
                const { name, callbacks } = field.build();
                schema[name] = callbacks;
            });
            return builder;
        },
        build: () => {
            return schema;
        },
    };
    return builder;
}
function field(name) {
    const callbacks = [];
    const builder = {
        set: (...validators) => {
            if (!validators)
                throw new Error("Callback not provided");
            callbacks.push(...validators);
            return builder;
        },
        build: () => {
            return {
                name,
                callbacks,
            };
        },
    };
    return builder;
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.validator.js.map