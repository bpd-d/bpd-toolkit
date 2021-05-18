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
/**
 * Validator callbacks
 */
export declare function min(minVal: number, message?: string): ValidationCallback;
export declare function max(maxVal: number, message?: string): ValidationCallback;
export declare function range(minVal: number, maxVal: number, message?: string): ValidationCallback;
export declare function match(compare: string | RegExp, message?: string): ValidationCallback;
export declare function equal(compare: any, message?: string): {
    name: string;
    failMessage: string;
    callback: (obj: any) => boolean;
};
export declare function ofType(typeString: string, message?: string): {
    name: string;
    failMessage: string;
    callback: (obj: any) => boolean;
};
export declare function validateSingleValue(prop: string, value: any, callbacks: ValidationCallback[], options?: ValidationOptions): ValidationResult;
export declare function validate<T extends V, V>(object: any, schema: ValidatonSchema, options?: ValidationOptions): ValidationResults<T>;
export declare function schema<T>(schemaStructure?: SchemaStructure): SchemaBuilder<T>;
export declare function field<T>(name: keyof T): SchemaFieldBuilder<T>;
