export interface ValidationResult {
	result: boolean;
	error?: ValidationError;
}

export interface ValidationResults<T> {
	result: boolean;
	errors?: ValidationError[];
	data?: T;
}

export interface ValidationOptions {
	checkAll?: boolean;
}

export interface ValidationError {
	prop?: string;
	steps: ValidationErrorStep[];
}

export interface ValidationErrorStep {
	message: string;
	name: string;
}

export interface ValidatonSchema {
	[id: string]: ValidationCallback[];
}

export interface SchemaField<T> {
	name: keyof T;
	callbacks: ValidationCallback[];
}

export interface ValidationCallback {
	name: string;
	failMessage: string;
	callback: (obj: any) => boolean;
}

export interface SchemaFieldBuilderBase<T> {
	build(): SchemaField<T>;
}

export interface SchemaFieldBuilder<T> extends SchemaFieldBuilderBase<T> {
	set(...callbacks: ValidationCallback[]): SchemaFieldBuilder<T>;
}

export interface SchemaBuilderBase {
	build(): ValidatonSchema;
}

export interface SchemaBuilder<T> extends SchemaBuilderBase {
	set(name: keyof T, ...callbacks: ValidationCallback[]): SchemaBuilder<T>;
	define(...fields: SchemaFieldBuilderBase<T>[]): SchemaBuilder<T>;
}

export interface SchemaStructure {
	[id: string]: SchemaFieldStructure;
}

export interface SchemaFieldStructure {
	min?: number | [number, string];
	max?: number | [number, string];
	range?: number[] | [number, number, string];
	type?: string | string[];
	required?: boolean | [boolean, string];
	match?: string | RegExp | [string | RegExp, string];
	equal?: any | any[];
	custom?: ValidationCallback;
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

function validationErrorHelper(prop?: string) {
	const validationError: ValidationError = {
		prop: prop,
		steps: [],
	};
	return {
		add: (name: string, message: string) => {
			validationError.steps.push({ name, message });
		},
		get: (): ValidationError | undefined => {
			return validationError.steps.length === 0
				? undefined
				: validationError;
		},
	};
}

function validationResultsHelper<T extends V, V>(init?: T) {
	const validationRes: ValidationResults<T> = {
		result: true,
		data: init,
	};
	return {
		add: (error: ValidationError) => {
			if (!validationRes.errors) {
				validationRes.errors = [];
			}
			validationRes.result = false;
			validationRes.errors.push(error);
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

function parseSchemaStructure(schema: SchemaStructure): ValidatonSchema {
	const result: ValidatonSchema = {};
	for (let prop in schema) {
		result[prop] = parseFieldStructure(schema[prop]);
	}
	return result;
}

function parseFieldStructure(
	fieldDef: SchemaFieldStructure
): ValidationCallback[] {
	const callbacks: ValidationCallback[] = [];
	for (let field in fieldDef) {
		const callback = getCallbackForField(
			<keyof SchemaFieldStructure>field,
			fieldDef[<keyof SchemaFieldStructure>field]
		);

		if (callback) {
			callbacks.push(callback);
		}
	}
	return callbacks;
}

function getCallbackForField(
	field: keyof SchemaFieldStructure,
	value: any
): ValidationCallback | undefined {
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

function exists(message?: string) {
	return {
		name: "exists",
		failMessage: message ?? "Does not exist",
		callback: (obj: any) => {
			return isExist(obj);
		},
	};
}

/**
 * Validator callbacks
 */

export function min(minVal: number, message?: string): ValidationCallback {
	if (typeof minVal !== "number") {
		throw new ValidateFunctionError("min", "Input param is incorrect");
	}
	return {
		name: "min",
		failMessage: message ?? "Is lesser than " + minVal,
		callback: (obj: any) => {
			return getLength(obj) >= minVal;
		},
	};
}

export function max(maxVal: number, message?: string): ValidationCallback {
	if (typeof maxVal !== "number") {
		throw new ValidateFunctionError("max", "Input param is incorrect");
	}
	return {
		name: "max",
		failMessage: message ?? "Is greater than " + maxVal,
		callback: (obj: any) => {
			return getLength(obj) <= maxVal;
		},
	};
}

export function range(
	minVal: number,
	maxVal: number,
	message?: string
): ValidationCallback {
	if (typeof maxVal !== "number" || typeof minVal !== "number") {
		throw new ValidateFunctionError("range", "Incorrect input params");
	}
	if (minVal >= maxVal) {
		throw new ValidateFunctionError("range", "Incorrect range provided");
	}
	return {
		name: "range",
		failMessage: message ?? `Doesn't match range ${minVal} and ${maxVal}`,
		callback: (obj: any) => {
			const len = getLength(obj);
			return len >= minVal && len <= maxVal;
		},
	};
}

export function match(
	compare: string | RegExp,
	message?: string
): ValidationCallback {
	return {
		name: "match",
		failMessage: message ?? `Doesn't match to ${compare}`,
		callback: (obj: any) => {
			if (!obj) {
				return false;
			}
			const result =
				typeof obj === "string"
					? obj.match(compare)
					: obj.toString().match(compare);

			return result !== null && result.length > 0;
		},
	};
}

export function equal(compare: any, message?: string) {
	return {
		name: "equal",
		failMessage: message ?? "Does not equal to " + compare,
		callback: (obj: any) => {
			return Object.is(obj, compare);
		},
	};
}

export function ofType(typeString: string, message?: string) {
	return {
		name: "ofType",
		failMessage: message ?? "Type doesn't match to " + typeString,
		callback: (obj: any) => {
			return typeof obj === typeString;
		},
	};
}

////////////////////////////////

export function validateSingleValue(
	prop: string,
	value: any,
	callbacks: ValidationCallback[],
	options?: ValidationOptions
): ValidationResult {
	const helper = validationErrorHelper(prop);
	const shallContinue = options?.checkAll;
	const validators = [exists(), ...callbacks];
	const vLen = validators.length;

	for (let i = 0; i < vLen; i++) {
		const validator = validators[i];
		try {
			if (!validator.callback(value)) {
				helper.add(validator.name, validator.failMessage);
				if (!shallContinue) break;
			}
		} catch (err) {
			helper.add(validator.name, `[Validator failure] ${err.message}`);
			if (!shallContinue) break;
		}
	}

	const fin = helper.get();
	return {
		result: fin === undefined,
		error: fin,
	};
}

export function validate<T extends V, V>(
	object: any,
	schema: ValidatonSchema,
	options?: ValidationOptions
): ValidationResults<T> {
	const helper = validationResultsHelper<T, V>();
	for (let prop in schema) {
		const value = object[prop];
		const singleRes = validateSingleValue(
			prop,
			value,
			schema[prop],
			options
		);

		if (singleRes.result) {
			helper.setProp(prop as any, value);
		} else {
			if (singleRes.error) helper.add(singleRes.error);
			if (!options?.checkAll) {
				break;
			}
		}
	}

	return helper.get();
}

export function schema<T>(schemaStructure?: SchemaStructure): SchemaBuilder<T> {
	const schema: ValidatonSchema = schemaStructure
		? parseSchemaStructure(schemaStructure)
		: {};
	const builder: SchemaBuilder<T> = {
		set: (name: keyof T, ...callbacks: ValidationCallback[]) => {
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
	const callbacks: ValidationCallback[] = [];
	const builder = {
		set: (...validators: ValidationCallback[]) => {
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
