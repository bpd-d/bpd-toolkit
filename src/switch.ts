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

export type SmartSwitchArgument<T> = T | (() => T);

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
export async function smartSwitch<T, V>(argument: SmartSwitchArgument<T>, options: SmartSwitchOptions<T, V>): Promise<V | undefined> {
    if (!options || !options.conditions) {
        return undefined;
    }

    let ret = options.default;
    const arg: T = isFunction(argument) ? (<any>argument)() : argument;

    for (const condition of options.conditions) {
        const result = condition(arg)
        if (result === undefined) {
            continue;
        }
        if (isFunction(result)) {
            ret = (<any>result)(arg);
        } else {
            ret = await Promise.resolve(<any>result);
        }


        if (options.multi !== true) {
            break;
        }
    }
    return ret;
}

function isFunction(functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}