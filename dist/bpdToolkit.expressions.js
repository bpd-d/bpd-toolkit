(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["expressions"] = factory();
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
/* harmony export */   "matches": () => (/* binding */ matches),
/* harmony export */   "all": () => (/* binding */ all),
/* harmony export */   "group": () => (/* binding */ group),
/* harmony export */   "or": () => (/* binding */ or),
/* harmony export */   "oneOf": () => (/* binding */ oneOf),
/* harmony export */   "notOneOf": () => (/* binding */ notOneOf),
/* harmony export */   "positiveLookahead": () => (/* binding */ positiveLookahead),
/* harmony export */   "negativeLookahead": () => (/* binding */ negativeLookahead),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "atLeastOne": () => (/* binding */ atLeastOne),
/* harmony export */   "noneOrMore": () => (/* binding */ noneOrMore),
/* harmony export */   "noneOrOne": () => (/* binding */ noneOrOne),
/* harmony export */   "capitalLetters": () => (/* binding */ capitalLetters),
/* harmony export */   "lowerLetters": () => (/* binding */ lowerLetters),
/* harmony export */   "digit": () => (/* binding */ digit),
/* harmony export */   "notDigit": () => (/* binding */ notDigit),
/* harmony export */   "whitespace": () => (/* binding */ whitespace),
/* harmony export */   "notWhitespace": () => (/* binding */ notWhitespace),
/* harmony export */   "word": () => (/* binding */ word),
/* harmony export */   "notWord": () => (/* binding */ notWord),
/* harmony export */   "any": () => (/* binding */ any),
/* harmony export */   "specialCharacters": () => (/* binding */ specialCharacters),
/* harmony export */   "default": () => (/* binding */ ValidationPattern)
/* harmony export */ });
/**
 * Creates expression like ([^expr]*[exp][^exp]*)
 * @param expression
 * @returns new expression following pattern
 */
function createOccurencePattern(expression) {
    return group(notOneOf(expression), "*", oneOf(expression), notOneOf(expression), "*");
}
/**
 * Creates expression like ^([^expr]*[expr][^expr]*){min, max}$
 * @param expression expression to check
 * @param min count min
 * @param max count max
 * @returns new expression following pattern
 */
function createOccurenceExpression(expression, min, max) {
    return all(createOccurencePattern(expression), range(min, max));
}
/**
 * Perform matching of string to validation pattern.
 * Function calculates execution time and return it with result
 * @param {String} value input value
 * @param {IExpressionPattern} pattern validation pattern
 * @param {String} flags - optional - regExp flags
 * @returns {IMatchResult} Match result
 */
function matches(value, pattern) {
    let result = {
        result: false,
        origin: null,
        pattern: null,
        input: value,
        time: -1,
    };
    if (!value) {
        return result;
    }
    const t1 = performance.now();
    try {
        const matchResult = value.match(pattern);
        result.pattern = pattern;
        result.result = matchResult !== null;
        result.origin = matchResult;
    }
    catch (e) {
        result.error = e;
    }
    finally {
        result.time = performance.now() - t1;
    }
    return result;
}
/**
 * Merges expressions into string
 * @param {String[]} expressions expressions
 * @returns pattern
 */
function expression(expressions) {
    return expressions.join("");
}
/**
 * Creates pattern ^value$
 * @param {String[]} value expressions
 * @returns pattern
 */
function all(...value) {
    return `^${expression(value)}$`;
}
/**
 * Creates pattern (value)
 * @param {String[]} value expressions
 * @returns pattern
 */
function group(...value) {
    return `(${expression(value)})`;
}
/**
 * Creates pattern value|value|value...
 * @param {String[]} value expressions
 * @returns pattern
 */
function or(...value) {
    return value.join("|");
}
/**
 * Creates pattern [value]
 * @param {String[]} value expressions
 * @returns pattern
 */
function oneOf(...value) {
    return `[${expression(value)}]`;
}
/**
 * Creates pattern [^value]
 * @param {String[]} value expressions
 * @returns pattern
 */
function notOneOf(...value) {
    return `[^${expression(value)}]`;
}
/**
 * Creates pattern (?=value)
 * @param {String[]} value expressions
 * @returns pattern
 */
function positiveLookahead(...value) {
    return group("?=", ...value);
}
/**
 * Creates pattern (?!value)
 * @param {String[]} value expressions
 * @returns pattern
 */
function negativeLookahead(...value) {
    return group("?!", ...value);
}
/**
 * Creates range pattern {min, max}
 * When min === max then pattern is {min}
 * @param min range min
 * @param max range max
 * @returns pattern
 */
function range(min, max) {
    return min === max ? `{${min}}` : `{${min},${max !== null && max !== void 0 ? max : ""}}`;
}
/**
 * Creates pattern value+
 * @param {String[]} value expressions
 * @returns pattern
 */
function atLeastOne(...value) {
    return `${expression(value)}+`;
}
/**
 * Creates pattern value*
 * @param {String[]} value expressions
 * @returns pattern
 */
function noneOrMore(...value) {
    return `${expression(value)}*`;
}
/**
 * Creates pattern value?
 * @param {String[]} value expressions
 * @returns pattern
 */
function noneOrOne(...value) {
    return `${expression(value)}?`;
}
const capitalLetters = "A-Z";
const lowerLetters = "a-z";
const digit = "\\d";
const notDigit = "\\D";
const whitespace = "\\s";
const notWhitespace = "\\S";
const word = "\\w";
const notWord = "\\W";
const any = ".";
const specialCharacters = "\\!\\*\\_\\?\\+\\=\\^\\$-@%#&";
/**
 * Helper class that builds regex validation pattern for strings
 * Logic is based on positive lookahead pattern. Expression is created from set of such rules
 */
class ValidationPattern {
    constructor(init) {
        this._list = [];
        if (init) {
            this._list.push(init);
        }
    }
    expr(...expressions) {
        this._list.push(...expressions);
        return this;
    }
    /**
     * Adds expression that validates whether string passes some condition
     * @param {String} expression - expression to check
     * @returns instance
     */
    check(expression) {
        return this.expr(positiveLookahead(expression));
    }
    /**
     * Adds expression that validates length of the string
     * If max is not provided then only minimum is checked
     * If min == max then string length shall equal exactly min
     * @param {Number} min - minimum number of occurences
     * @param {Number} max - {optional} - maximum number of occurences
     * @returns instance
     */
    ofLength(min, max) {
        return this.check(all(`.${range(min, max)}`));
    }
    /**
     * Adds expression that validates whether string contains capital letters
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withCapital(count) {
        return this.check(createOccurenceExpression(capitalLetters, 1, count));
    }
    /**
     * Adds expression that validates whether string contains lower cased letters
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withLower(count) {
        return this.check(createOccurenceExpression(lowerLetters, 1, count));
    }
    /**
     * Adds expression that validates whether string contains whitespaces
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withWhitespace(count) {
        return this.check(createOccurenceExpression(whitespace, 1, count));
    }
    /**
     * Adds expression that validates whether string contain any of the characters
     * @param {String} characters - characters to check
     * @returns instance
     */
    withAnyOf(characters) {
        const specialChars = characters !== null && characters !== void 0 ? characters : specialCharacters;
        return this.check(createOccurenceExpression(specialChars, 1));
    }
    /**
     * Adds expression that validates whether string does not contain characters
     * Pattern looks like: (?=^((?![characters]]).)*$)
     * @param characters - string containing characters that shall not be in input
     * @returns instance
     */
    withNoneOf(characters) {
        return this.check(all(group(negativeLookahead(oneOf(characters)), "."), "*"));
    }
    /**
     * Adds expression that validates whether string contains digits
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withDigits(count) {
        return this.check(createOccurenceExpression(digit, 1, count));
    }
    /**
     * Adds expression that validates whether string does not contain whitespaces
     * @returns instance
     */
    noWhitespace() {
        return this.check(all(notWhitespace, "+"));
    }
    /**
     * Adds expression that validates whether string contains only digits
     * @returns instance
     */
    digitsOnly() {
        return this.check(all(digit, "+"));
    }
    /**
     * Adds expression that validates if string contains word only characters (a-zA-Z0-9_)
     * @returns instance
     */
    wordOnly() {
        return this.check(all(word, "+"));
    }
    /**
     * Adds expression that validates if string does not contain any digit
     * @returns instance
     */
    noDigits() {
        return this.check(all(notDigit, "+"));
    }
    toString() {
        return this._list.join("");
    }
    /**
     * Creates regular expression from string representation of the instance
     * @param flags - regex flags
     * @returns {RegExp} regular exporession
     */
    toExpression(flags) {
        return new RegExp("^" + this.toString() + ".*$", flags);
    }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.expressions.js.map