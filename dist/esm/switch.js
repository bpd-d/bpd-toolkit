var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Provides switch implementation with callbacks provided as array
 * @param argument - switch key argument
 * @param options - switch options: condition callbacks, multi, default
 * @returns
 */
export function smartSwitch(argument, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options || !options.conditions) {
            return undefined;
        }
        let ret = options.default;
        const arg = isFunction(argument) ? argument() : argument;
        for (const condition of options.conditions) {
            const result = condition(arg);
            if (result === undefined) {
                continue;
            }
            if (isFunction(result)) {
                ret = result(arg);
            }
            else {
                ret = yield Promise.resolve(result);
            }
            if (options.multi !== true) {
                break;
            }
        }
        return ret;
    });
}
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
