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
export function matches(value, pattern) {
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
export function all(...value) {
    return `^${expression(value)}$`;
}
/**
 * Creates pattern (value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export function group(...value) {
    return `(${expression(value)})`;
}
/**
 * Creates pattern value|value|value...
 * @param {String[]} value expressions
 * @returns pattern
 */
export function or(...value) {
    return value.join("|");
}
/**
 * Creates pattern [value]
 * @param {String[]} value expressions
 * @returns pattern
 */
export function oneOf(...value) {
    return `[${expression(value)}]`;
}
/**
 * Creates pattern [^value]
 * @param {String[]} value expressions
 * @returns pattern
 */
export function notOneOf(...value) {
    return `[^${expression(value)}]`;
}
/**
 * Creates pattern (?=value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export function positiveLookahead(...value) {
    return group("?=", ...value);
}
/**
 * Creates pattern (?!value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export function negativeLookahead(...value) {
    return group("?!", ...value);
}
/**
 * Creates range pattern {min, max}
 * When min === max then pattern is {min}
 * @param min range min
 * @param max range max
 * @returns pattern
 */
export function range(min, max) {
    return min === max ? `{${min}}` : `{${min},${max !== null && max !== void 0 ? max : ""}}`;
}
/**
 * Creates pattern value+
 * @param {String[]} value expressions
 * @returns pattern
 */
export function atLeastOne(...value) {
    return `${expression(value)}+`;
}
/**
 * Creates pattern value*
 * @param {String[]} value expressions
 * @returns pattern
 */
export function noneOrMore(...value) {
    return `${expression(value)}*`;
}
/**
 * Creates pattern value?
 * @param {String[]} value expressions
 * @returns pattern
 */
export function noneOrOne(...value) {
    return `${expression(value)}?`;
}
export const capitalLetters = "A-Z";
export const lowerLetters = "a-z";
export const digit = "\\d";
export const notDigit = "\\D";
export const whitespace = "\\s";
export const notWhitespace = "\\S";
export const word = "\\w";
export const notWord = "\\W";
export const any = ".";
export const specialCharacters = "\\!\\*\\_\\?\\+\\=\\^\\$-@%#&";
/**
 * Helper class that builds regex validation pattern for strings
 * Logic is based on positive lookahead pattern. Expression is created from set of such rules
 */
export default class ValidationPattern {
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
