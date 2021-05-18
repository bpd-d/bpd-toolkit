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
 * Creates expression like ([^expr]*[exp][^exp]*)
 * @param expression
 * @returns new expression following pattern
 */
function createOccurencePattern(expression: string) {
	return group(
		notOneOf(expression),
		"*",
		oneOf(expression),
		notOneOf(expression),
		"*"
	);
}

/**
 * Creates expression like ^([^expr]*[expr][^expr]*){min, max}$
 * @param expression expression to check
 * @param min count min
 * @param max count max
 * @returns new expression following pattern
 */
function createOccurenceExpression(
	expression: string,
	min: number,
	max?: number
) {
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
export function matches(
	value: string,
	pattern: string | RegExp,
): IMatchResult {
	let result: IMatchResult = {
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
	} catch (e) {
		result.error = e;
	} finally {
		result.time = performance.now() - t1;
	}

	return result;
}

/**
 * Merges expressions into string
 * @param {String[]} expressions expressions
 * @returns pattern
 */
function expression(expressions: string[]): string {
	return expressions.join("");
}

/**
 * Creates pattern ^value$
 * @param {String[]} value expressions
 * @returns pattern
 */
export function all(...value: string[]): string {
	return `^${expression(value)}$`;
}

/**
 * Creates pattern (value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export function group(...value: string[]): string {
	return `(${expression(value)})`;
}

/**
 * Creates pattern value|value|value...
 * @param {String[]} value expressions
 * @returns pattern
 */
export function or(...value: string[]): string {
	return value.join("|");
}

/**
 * Creates pattern [value]
 * @param {String[]} value expressions
 * @returns pattern
 */
export function oneOf(...value: string[]): string {
	return `[${expression(value)}]`;
}

/**
 * Creates pattern [^value]
 * @param {String[]} value expressions
 * @returns pattern
 */
export function notOneOf(...value: string[]): string {
	return `[^${expression(value)}]`;
}

/**
 * Creates pattern (?=value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export function positiveLookahead(...value: string[]): string {
	return group("?=", ...value);
}

/**
 * Creates pattern (?!value)
 * @param {String[]} value expressions
 * @returns pattern
 */
export function negativeLookahead(...value: string[]): string {
	return group("?!", ...value);
}

/**
 * Creates range pattern {min, max}
 * When min === max then pattern is {min}
 * @param min range min
 * @param max range max
 * @returns pattern
 */
export function range(min: number, max?: number) {
	return min === max ? `{${min}}` : `{${min},${max ?? ""}}`;
}

/**
 * Creates pattern value+
 * @param {String[]} value expressions
 * @returns pattern
 */
export function atLeastOne(...value: string[]) {
	return `${expression(value)}+`;
}
/**
 * Creates pattern value*
 * @param {String[]} value expressions
 * @returns pattern
 */
export function noneOrMore(...value: string[]) {
	return `${expression(value)}*`;
}

/**
 * Creates pattern value?
 * @param {String[]} value expressions
 * @returns pattern
 */
export function noneOrOne(...value: string[]) {
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
export default class ValidationPattern
	implements IValidationPattern, IExpressionPattern
{
	private _list: string[];
	constructor(init?: string) {
		this._list = [];
		if (init) {
			this._list.push(init);
		}
	}

	expr(...expressions: string[]): IValidationPattern {
		this._list.push(...expressions);
		return this;
	}

	/**
	 * Adds expression that validates whether string passes some condition
	 * @param {String} expression - expression to check
	 * @returns instance
	 */
	check(expression: string): IValidationPattern {
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
	ofLength(min: number, max?: number): IValidationPattern {
		return this.check(all(`.${range(min, max)}`));
	}
	/**
	 * Adds expression that validates whether string contains capital letters
	 * @param {Number} count - {optional} - maximum number of occurences
	 * @returns instance
	 */
	withCapital(count?: number): IValidationPattern {
		return this.check(createOccurenceExpression(capitalLetters, 1, count));
	}
	/**
	 * Adds expression that validates whether string contains lower cased letters
	 * @param {Number} count - {optional} - maximum number of occurences
	 * @returns instance
	 */
	withLower(count?: number): IValidationPattern {
		return this.check(createOccurenceExpression(lowerLetters, 1, count));
	}
	/**
	 * Adds expression that validates whether string contains whitespaces
	 * @param {Number} count - {optional} - maximum number of occurences
	 * @returns instance
	 */
	withWhitespace(count?: number): IValidationPattern {
		return this.check(createOccurenceExpression(whitespace, 1, count));
	}

	/**
	 * Adds expression that validates whether string contain any of the characters
	 * @param {String} characters - characters to check
	 * @returns instance
	 */
	withAnyOf(characters?: string): IValidationPattern {
		const specialChars = characters ?? specialCharacters;
		return this.check(createOccurenceExpression(specialChars, 1));
	}

	/**
	 * Adds expression that validates whether string does not contain characters
	 * Pattern looks like: (?=^((?![characters]]).)*$)
	 * @param characters - string containing characters that shall not be in input
	 * @returns instance
	 */
	withNoneOf(characters: string): IValidationPattern {
		return this.check(
			all(group(negativeLookahead(oneOf(characters)), "."), "*")
		);
	}

	/**
	 * Adds expression that validates whether string contains digits
	 * @param {Number} count - {optional} - maximum number of occurences
	 * @returns instance
	 */
	withDigits(count?: number): IValidationPattern {
		return this.check(createOccurenceExpression(digit, 1, count));
	}

	/**
	 * Adds expression that validates whether string does not contain whitespaces
	 * @returns instance
	 */
	noWhitespace(): IValidationPattern {
		return this.check(all(notWhitespace, "+"));
	}

	/**
	 * Adds expression that validates whether string contains only digits
	 * @returns instance
	 */
	digitsOnly(): IValidationPattern {
		return this.check(all(digit, "+"));
	}
	/**
	 * Adds expression that validates if string contains word only characters (a-zA-Z0-9_)
	 * @returns instance
	 */
	wordOnly(): IValidationPattern {
		return this.check(all(word, "+"));
	}
	/**
	 * Adds expression that validates if string does not contain any digit
	 * @returns instance
	 */
	noDigits(): IValidationPattern {
		return this.check(all(notDigit, "+"));
	}

	toString(): string {
		return this._list.join("");
	}

	/**
	 * Creates regular expression from string representation of the instance
	 * @param flags - regex flags
	 * @returns {RegExp} regular exporession
	 */
	toExpression(flags?: string): RegExp {
		return new RegExp("^" + this.toString() + ".*$", flags);
	}
}
