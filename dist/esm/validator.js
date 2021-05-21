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
function validationResultsHelper(init) {
    const validationRes = {
        result: true,
        data: init,
    };
    return {
        add: (prop, errors) => {
            if (!validationRes.errors) {
                validationRes.errors = {};
            }
            validationRes.result = false;
            validationRes.errors[prop] = errors;
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
    let argument = value;
    let message = undefined;
    if (Array.isArray(value)) {
        [argument, message] = value;
    }
    switch (field) {
        case "min":
            return min(argument);
        case "max":
            return max(argument);
        case "equal":
            return equal(argument);
        case "match":
            return match(argument);
        case "type":
            return ofType(argument);
        case "compare":
            return compare(argument);
        case "range": {
            if (!Array.isArray(value) || value.length < 2) {
                return undefined;
            }
            message = value.length > 2 ? value[2] : undefined;
            return range(value[0], value[1], message);
        }
        default:
            return undefined;
    }
}
function exists(message) {
    return (obj) => {
        return {
            status: isExist(obj),
            message: message !== null && message !== void 0 ? message : "Does not exist",
        };
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
export function min(minVal, message) {
    if (typeof minVal !== "number") {
        throw new ValidateFunctionError("min", "Input param is incorrect");
    }
    return (obj) => {
        return {
            status: getLength(obj) >= minVal,
            message: message !== null && message !== void 0 ? message : "Is lesser than " + minVal,
        };
    };
}
/**
 * Check whether value (or length) is smaller or equal to value
 * @param maxVal - value to compare current field with
 * @param message
 * @returns
 */
export function max(maxVal, message) {
    if (typeof maxVal !== "number") {
        throw new ValidateFunctionError("max", "Input param is incorrect");
    }
    return (obj) => {
        return {
            status: getLength(obj) <= maxVal,
            message: message !== null && message !== void 0 ? message : "Is greater than " + maxVal,
        };
    };
}
/**
 * Compares whether values of two fields are equal
 * @param fieldName field to compare with current
 * @param message
 * @returns
 */
export function compare(fieldName, message) {
    if (typeof fieldName !== "string") {
        throw new ValidateFunctionError("compare", "Input param is incorrect");
    }
    return (obj, name, parent) => {
        return {
            status: parent[fieldName] === obj,
            message: message !== null && message !== void 0 ? message : "Is different than " + fieldName,
        };
    };
}
/**
 * Checks if value is within the range (for strings and array length is compared)
 * @param {Number} minVal - minmum range value
 * @param {Number} maxVal - max range value
 * @param {String} message
 * @returns
 */
export function range(minVal, maxVal, message) {
    if (typeof maxVal !== "number" || typeof minVal !== "number") {
        throw new ValidateFunctionError("range", "Incorrect input params");
    }
    if (minVal >= maxVal) {
        throw new ValidateFunctionError("range", "Incorrect range provided");
    }
    return (obj) => {
        const len = getLength(obj);
        return {
            status: len >= minVal && len <= maxVal,
            message: message !== null && message !== void 0 ? message : `Doesn't match range ${minVal} and ${maxVal}`,
        };
    };
}
/**
 * Matches field value with compare string or regex
 * @param {String | RegExp} compare
 * @param {String} message
 * @returns
 */
export function match(compare, message) {
    return (obj) => {
        const resultObject = {
            status: false,
            message: message !== null && message !== void 0 ? message : `Doesn't match to ${compare}`,
        };
        if (!obj) {
            return resultObject;
        }
        const matchResult = typeof obj === "string"
            ? obj.match(compare)
            : obj.toString().match(compare);
        resultObject.status = matchResult !== null;
        return resultObject;
    };
}
/**
 * Checks if field value equals to compare
 * @param {any} compare Value to compore field with
 * @param {String} message
 * @returns
 */
export function equal(compare, message) {
    return (obj) => {
        return {
            status: Object.is(obj, compare),
            message: message !== null && message !== void 0 ? message : "Does not equal to " + compare,
        };
    };
}
/**
 * Check if field value is of expected type
 * @param {String} typeString - exprected type of the field
 * @param {String} message
 * @returns
 */
export function ofType(typeString, message) {
    return (obj) => {
        return {
            status: typeof obj === typeString,
            message: message !== null && message !== void 0 ? message : "Type doesn't match to " + typeString,
        };
    };
}
////////////////////////////////
export function validateSingleValue(prop, value, parent, callbacks, options) {
    var _a;
    const errors = [];
    const shallContinue = options === null || options === void 0 ? void 0 : options.checkAll;
    const validators = [exists(), ...callbacks];
    const vLen = validators.length;
    for (let i = 0; i < vLen; i++) {
        const validatorResult = validators[i](value, prop, parent);
        try {
            if (!validatorResult.status) {
                errors.push((_a = validatorResult.message) !== null && _a !== void 0 ? _a : "Unknown error");
                if (!shallContinue)
                    break;
            }
        }
        catch (err) {
            errors.push("[Internal] Validation callback error");
            if (!shallContinue)
                break;
        }
    }
    return errors;
}
export function validate(object, schema, options) {
    const helper = validationResultsHelper();
    for (let prop in schema) {
        const value = object[prop];
        const singleRes = validateSingleValue(prop, value, object, schema[prop], options);
        if (singleRes.length === 0) {
            helper.setProp(prop, value);
        }
        else {
            helper.add(prop, singleRes);
            if (!(options === null || options === void 0 ? void 0 : options.checkAll)) {
                break;
            }
        }
    }
    return helper.get();
}
export function schema(schemaStructure) {
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
export function field(name) {
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
