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
export interface ValidatonSchema<T> {
    [id: string]: ValidationCallback<T>[];
}
export interface SchemaField<T> {
    name: keyof T;
    callbacks: ValidationCallback<T>[];
}
export interface ValidationCallback<T> {
    name: string;
    failMessage: string;
    callback: (obj: any, name: keyof T, parent: T) => boolean;
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
    compare?: string;
    custom?: ValidationCallback<T>;
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
export declare function min<T>(minVal: number, message?: string): ValidationCallback<T>;
/**
 * Check whether value (or length) is smaller or equal to value
 * @param maxVal - value to compare current field with
 * @param message
 * @returns
 */
export declare function max<T>(maxVal: number, message?: string): ValidationCallback<T>;
/**
 * Compares whether values of two fields are equal
 * @param fieldName field to compare with current
 * @param message
 * @returns
 */
export declare function compare<T>(fieldName: string, message?: string): ValidationCallback<T>;
/**
 * Checks if value is within the range (for strings and array length is compared)
 * @param {Number} minVal - minmum range value
 * @param {Number} maxVal - max range value
 * @param {String} message
 * @returns
 */
export declare function range<T>(minVal: number, maxVal: number, message?: string): ValidationCallback<T>;
/**
 * Matches field value with compare string or regex
 * @param {String | RegExp} compare
 * @param {String} message
 * @returns
 */
export declare function match<T>(compare: string | RegExp, message?: string): ValidationCallback<T>;
/**
 * Checks if field value equals to compare
 * @param {any} compare Value to compore field with
 * @param {String} message
 * @returns
 */
export declare function equal<T>(compare: any, message?: string): ValidationCallback<T>;
/**
 * Check if field value is of expected type
 * @param {String} typeString - exprected type of the field
 * @param {String} message
 * @returns
 */
export declare function ofType<T>(typeString: string, message?: string): ValidationCallback<T>;
export declare function validateSingleValue<T>(prop: keyof T, value: any, parent: T, callbacks: ValidationCallback<T>[], options?: ValidationOptions): ValidationResult;
export declare function validate<T extends V, V>(object: any, schema: ValidatonSchema<V>, options?: ValidationOptions): ValidationResults<T>;
export declare function schema<T>(schemaStructure?: SchemaStructure<T>): SchemaBuilder<T>;
export declare function field<T>(name: keyof T): SchemaFieldBuilder<T>;
