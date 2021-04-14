export interface SmartSwitchConditionResult<V> {
    value: V;
    state: boolean;
}
export interface SmartSwitchConditionCallback<T, V> {
    (arg: T): Promise<V>;
}
export interface SmartSwitchCondition<T, V> {
    (arg: T): ((arg: T) => V) | Promise<V> | V | undefined;
}
export declare type SmartSwitchArgument<T> = T | (() => T);
interface SmartSwitchBaseOptions<V> {
    default?: V | undefined;
    multi?: boolean;
}
export interface SmartSwitchOptions<T, V> extends SmartSwitchBaseOptions<V> {
    conditions: SmartSwitchCondition<T, V>[];
}
/**
 * Provides switch implementation with callbacks provided as array
 * @param argument - switch key argument
 * @param options - switch options: condition callbacks, multi, default
 * @returns
 */
export declare function smartSwitch<T, V>(argument: SmartSwitchArgument<T>, options: SmartSwitchOptions<T, V>): Promise<V | undefined>;
export {};
