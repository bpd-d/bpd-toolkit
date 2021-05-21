export interface ValidationResult {
	result: boolean;
	error?: ValidationError;
}

export interface ValidationResults<T> {
	result: boolean;
	errors?: ValidationError;
	data?: T;
}

export interface ValidationOptions {
	checkAll?: boolean;
}

export interface ValidationError {
	[id: string]: string[];
}

export interface ValidationErrorStep {
	message: string;
	name: string;
}

export interface ValidatonSchema<T> {
	[id: string]: ValidationCallback<T>[];
}

export interface SchemaField<T> {
	name: keyof T;
	callbacks: ValidationCallback<T>[];
}

// export interface ValidationCallback<T> {
// 	name: string;
// 	failMessage: string;
// 	callback: (obj: any, name: keyof T, parent: T) => boolean;
// }
export interface ValidationCallbackResult {
	status: boolean;
	message?: string;
}
export interface ValidationCallback<T> {
	(
		currentValue: any,
		currentProp: keyof T,
		parent: T
	): ValidationCallbackResult;
}

export interface SchemaFieldBuilderBase<T> {
	build(): SchemaField<T>;
}

export interface SchemaFieldBuilder<T> extends SchemaFieldBuilderBase<T> {
	set(...callbacks: ValidationCallback<T>[]): SchemaFieldBuilder<T>;
}

export interface SchemaBuilderBase<T> {
	build(): ValidatonSchema<T>;
}

export interface SchemaBuilder<T> extends SchemaBuilderBase<T> {
	set(name: keyof T, ...callbacks: ValidationCallback<T>[]): SchemaBuilder<T>;
	define(...fields: SchemaFieldBuilderBase<T>[]): SchemaBuilder<T>;
}

export interface SchemaStructure<T> {
	[id: string]: SchemaFieldStructure<T>;
}

export interface SchemaFieldStructure<T> {
	min?: number | [number, string];
	max?: number | [number, string];
	range?: number[] | [number, number, string];
	type?: string | string[];
	required?: boolean | [boolean, string];
	match?: string | RegExp | [string | RegExp, string];
	equal?: any | any[];
	compare?: [string, string];
	custom?: ValidationCallback<T>;
}

// Errors

class ValidateFunctionError extends Error {
	constructor(fname: string, message: string) {
		super(`Error in function: ${fname}: ${message}`);
		this.name = "ValidateFunctionError";
	}
}

// Helper functions

function getLength(obj: any): number {
	if (typeof obj === "number") {
		return obj;
	}
	if (obj["length"] && typeof obj["length"] === "number") {
		return obj["length"];
	}
	return parseInt(obj);
}

function isExist(obj: any) {
	return typeof obj !== "undefined" && obj !== null;
}

function validationResultsHelper<T extends V, V>(init?: T) {
	const validationRes: ValidationResults<T> = {
		result: true,
		data: init,
	};
	return {
		add: (prop: string, errors: string[]) => {
			if (!validationRes.errors) {
				validationRes.errors = {};
			}
			validationRes.result = false;
			validationRes.errors[prop] = errors;
		},
		setProp: (prop: keyof T, value: any) => {
			if (!validationRes.data) return;
			validationRes.data[prop] = value;
		},
		get: (): ValidationResults<T> => {
			if (!validationRes.result) {
				validationRes.data = undefined;
			}
			return validationRes;
		},
	};
}

function parseSchemaStructure<T>(
	schema: SchemaStructure<T>
): ValidatonSchema<T> {
	const result: ValidatonSchema<T> = {};
	for (let prop in schema) {
		result[prop] = parseFieldStructure(schema[prop]);
	}
	return result;
}

function parseFieldStructure<T>(
	fieldDef: SchemaFieldStructure<T>
): ValidationCallback<T>[] {
	const callbacks: ValidationCallback<T>[] = [];
	for (let field in fieldDef) {
		const callback = getCallbackForField<T>(
			<keyof SchemaFieldStructure<T>>field,
			fieldDef[<keyof SchemaFieldStructure<T>>field]
		);

		if (callback) {
			callbacks.push(callback);
		}
	}
	return callbacks;
}

function getCallbackForField<T>(
	field: keyof SchemaFieldStructure<T>,
	value: any
): ValidationCallback<T> | undefined {
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

function exists<T>(message?: string): ValidationCallback<T> {
	return (obj: any) => {
		return {
			status: isExist(obj),
			message: message ?? "Does not exist",
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
export function min<T>(
	minVal: number,
	message?: string
): ValidationCallback<T> {
	if (typeof minVal !== "number") {
		throw new ValidateFunctionError("min", "Input param is incorrect");
	}
	return (obj: any) => {
		return {
			status: getLength(obj) >= minVal,
			message: message ?? "Is lesser than " + minVal,
		};
	};
}

/**
 * Check whether value (or length) is smaller or equal to value
 * @param maxVal - value to compare current field with
 * @param message
 * @returns
 */
export function max<T>(
	maxVal: number,
	message?: string
): ValidationCallback<T> {
	if (typeof maxVal !== "number") {
		throw new ValidateFunctionError("max", "Input param is incorrect");
	}
	return (obj: any) => {
		return {
			status: getLength(obj) <= maxVal,
			message: message ?? "Is greater than " + maxVal,
		};
	};
}

/**
 * Compares whether values of two fields are equal
 * @param fieldName field to compare with current
 * @param message
 * @returns
 */
export function compare<T>(
	fieldName: string,
	message?: string
): ValidationCallback<T> {
	if (typeof fieldName !== "string") {
		throw new ValidateFunctionError("compare", "Input param is incorrect");
	}
	return (obj: any, name: keyof T, parent: T) => {
		return {
			status: (<any>parent)[fieldName] === obj,
			message: message ?? "Is different than " + fieldName,
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
export function range<T>(
	minVal: number,
	maxVal: number,
	message?: string
): ValidationCallback<T> {
	if (typeof maxVal !== "number" || typeof minVal !== "number") {
		throw new ValidateFunctionError("range", "Incorrect input params");
	}
	if (minVal >= maxVal) {
		throw new ValidateFunctionError("range", "Incorrect range provided");
	}
	return (obj: any) => {
		const len = getLength(obj);
		return {
			status: len >= minVal && len <= maxVal,
			message: message ?? `Doesn't match range ${minVal} and ${maxVal}`,
		};
	};
}

/**
 * Matches field value with compare string or regex
 * @param {String | RegExp} compare
 * @param {String} message
 * @returns
 */
export function match<T>(
	compare: string | RegExp,
	message?: string
): ValidationCallback<T> {
	return (obj: any) => {
		const resultObject = {
			status: false,
			message: message ?? `Doesn't match to ${compare}`,
		};

		if (!obj) {
			return resultObject;
		}

		const matchResult =
			typeof obj === "string"
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
export function equal<T>(
	compare: any,
	message?: string
): ValidationCallback<T> {
	return (obj: any) => {
		return {
			status: Object.is(obj, compare),
			message: message ?? "Does not equal to " + compare,
		};
	};
}

/**
 * Check if field value is of expected type
 * @param {String} typeString - exprected type of the field
 * @param {String} message
 * @returns
 */
export function ofType<T>(
	typeString: string,
	message?: string
): ValidationCallback<T> {
	return (obj: any) => {
		return {
			status: typeof obj === typeString,
			message: message ?? "Type doesn't match to " + typeString,
		};
	};
}

////////////////////////////////

export function validateSingleValue<T>(
	prop: keyof T,
	value: any,
	parent: T,
	callbacks: ValidationCallback<T>[],
	options?: ValidationOptions
): string[] {
	const errors: string[] = [];
	const shallContinue = options?.checkAll;
	const validators = [exists(), ...callbacks];
	const vLen = validators.length;

	for (let i = 0; i < vLen; i++) {
		const validatorResult = (<ValidationCallback<T>>validators[i])(
			value,
			prop,
			parent
		);
		try {
			if (!validatorResult.status) {
				errors.push(validatorResult.message ?? "Unknown error");

				if (!shallContinue) break;
			}
		} catch (err) {
			errors.push("[Internal] Validation callback error");
			if (!shallContinue) break;
		}
	}

	return errors;
}

export function validate<T extends V, V>(
	object: any,
	schema: ValidatonSchema<V>,
	options?: ValidationOptions
): ValidationResults<T> {
	const helper = validationResultsHelper<T, V>();
	for (let prop in schema) {
		const value = object[prop];
		const singleRes = validateSingleValue(
			prop,
			value,
			object,
			schema[prop],
			options
		);

		if (singleRes.length === 0) {
			helper.setProp(prop as any, value);
		} else {
			helper.add(prop, singleRes);
			if (!options?.checkAll) {
				break;
			}
		}
	}

	return helper.get();
}

export function schema<T>(
	schemaStructure?: SchemaStructure<T>
): SchemaBuilder<T> {
	const schema: ValidatonSchema<T> = schemaStructure
		? parseSchemaStructure(schemaStructure)
		: {};
	const builder: SchemaBuilder<T> = {
		set: (name: keyof T, ...callbacks: ValidationCallback<T>[]) => {
			schema[name as string] = callbacks;
			return builder;
		},
		define: (...fields: SchemaFieldBuilderBase<T>[]) => {
			fields.forEach((field) => {
				const { name, callbacks } = field.build();
				schema[name as string] = callbacks;
			});
			return builder;
		},
		build: () => {
			return schema;
		},
	};
	return builder;
}

export function field<T>(name: keyof T): SchemaFieldBuilder<T> {
	const callbacks: ValidationCallback<T>[] = [];
	const builder = {
		set: (...validators: ValidationCallback<T>[]) => {
			if (!validators) throw new Error("Callback not provided");
			callbacks.push(...validators);
			return builder;
		},

		build: (): SchemaField<T> => {
			return {
				name,
				callbacks,
			};
		},
	};
	return builder;
}
