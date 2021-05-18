export interface IValidationPattern {
    expr(...expressions: string[]): IValidationPattern;
    check(expression: string): IValidationPattern;
    ofLength(min: number, max?: number): IValidationPattern;
    withCapital(count?: number): IValidationPattern;
    withLower(count?: number): IValidationPattern;
    withWhitespace(count?: number): IValidationPattern;
    withAnyOf(characters?: string): IValidationPattern;
    withNoneOf(characters: string): IValidationPattern;
    withDigits(count?: number): IValidationPattern;
    noWhitespace(): IValidationPattern;
    digitsOnly(): IValidationPattern;
    wordOnly(): IValidationPattern;
    noDigits(): IValidationPattern;
}
export interface IExpressionPattern {
    toExpression(flags?: string): RegExp;
}
interface IMatchResult {
    result: boolean;
    input: string;
    error?: Error | string;
    origin: RegExpMatchArray | null;
    time: number;
    pattern: RegExp | string | null;
}
/**
 * Perform matching of string to validation pattern.
 * Function calculates execution time and return it with result
 * @param {String} value input value
 * @param {IExpressionPattern} pattern validation pattern
 * @param {String} flags - optional - regExp flags
 * @returns {IMatchResult} Match result
 */
export declare function matches(value: string, pattern: string | RegExp): IMatchResult;
/**
 * Creates pattern ^value$
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function all(...value: string[]): string;
/**
 * Creates pattern (value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function group(...value: string[]): string;
/**
 * Creates pattern value|value|value...
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function or(...value: string[]): string;
/**
 * Creates pattern [value]
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function oneOf(...value: string[]): string;
/**
 * Creates pattern [^value]
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function notOneOf(...value: string[]): string;
/**
 * Creates pattern (?=value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function positiveLookahead(...value: string[]): string;
/**
 * Creates pattern (?!value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function negativeLookahead(...value: string[]): string;
/**
 * Creates range pattern {min, max}
 * When min === max then pattern is {min}
 * @param min range min
 * @param max range max
 * @returns pattern
 */
export declare function range(min: number, max?: number): string;
/**
 * Creates pattern value+
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function atLeastOne(...value: string[]): string;
/**
 * Creates pattern value*
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function noneOrMore(...value: string[]): string;
/**
 * Creates pattern value?
 * @param {String[]} value expressions
 * @returns pattern
 */
export declare function noneOrOne(...value: string[]): string;
export declare const capitalLetters = "A-Z";
export declare const lowerLetters = "a-z";
export declare const digit = "\\d";
export declare const notDigit = "\\D";
export declare const whitespace = "\\s";
export declare const notWhitespace = "\\S";
export declare const word = "\\w";
export declare const notWord = "\\W";
export declare const any = ".";
export declare const specialCharacters = "\\!\\*\\_\\?\\+\\=\\^\\$-@%#&";
/**
 * Helper class that builds regex validation pattern for strings
 * Logic is based on positive lookahead pattern. Expression is created from set of such rules
 */
export default class ValidationPattern implements IValidationPattern, IExpressionPattern {
    private _list;
    constructor(init?: string);
    expr(...expressions: string[]): IValidationPattern;
    /**
     * Adds expression that validates whether string passes some condition
     * @param {String} expression - expression to check
     * @returns instance
     */
    check(expression: string): IValidationPattern;
    /**
     * Adds expression that validates length of the string
     * If max is not provided then only minimum is checked
     * If min == max then string length shall equal exactly min
     * @param {Number} min - minimum number of occurences
     * @param {Number} max - {optional} - maximum number of occurences
     * @returns instance
     */
    ofLength(min: number, max?: number): IValidationPattern;
    /**
     * Adds expression that validates whether string contains capital letters
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withCapital(count?: number): IValidationPattern;
    /**
     * Adds expression that validates whether string contains lower cased letters
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withLower(count?: number): IValidationPattern;
    /**
     * Adds expression that validates whether string contains whitespaces
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withWhitespace(count?: number): IValidationPattern;
    /**
     * Adds expression that validates whether string contain any of the characters
     * @param {String} characters - characters to check
     * @returns instance
     */
    withAnyOf(characters?: string): IValidationPattern;
    /**
     * Adds expression that validates whether string does not contain characters
     * Pattern looks like: (?=^((?![characters]]).)*$)
     * @param characters - string containing characters that shall not be in input
     * @returns instance
     */
    withNoneOf(characters: string): IValidationPattern;
    /**
     * Adds expression that validates whether string contains digits
     * @param {Number} count - {optional} - maximum number of occurences
     * @returns instance
     */
    withDigits(count?: number): IValidationPattern;
    /**
     * Adds expression that validates whether string does not contain whitespaces
     * @returns instance
     */
    noWhitespace(): IValidationPattern;
    /**
     * Adds expression that validates whether string contains only digits
     * @returns instance
     */
    digitsOnly(): IValidationPattern;
    /**
     * Adds expression that validates if string contains word only characters (a-zA-Z0-9_)
     * @returns instance
     */
    wordOnly(): IValidationPattern;
    /**
     * Adds expression that validates if string does not contain any digit
     * @returns instance
     */
    noDigits(): IValidationPattern;
    toString(): string;
    /**
     * Creates regular expression from string representation of the instance
     * @param flags - regex flags
     * @returns {RegExp} regular exporession
     */
    toExpression(flags?: string): RegExp;
}
export {};
