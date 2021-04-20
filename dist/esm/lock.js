class BpdLock {
    constructor(options) {
        var _a;
        this._lock = options.initial === true;
        this._throwErrors = options.throwErrors === true;
        this._name = (_a = options.name) !== null && _a !== void 0 ? _a : "-";
    }
    lock(caller) {
        if (this.isLocked()) {
            this.throwError("lock", caller);
            return false;
        }
        this._lock = true;
        return true;
    }
    unlock(caller) {
        if (!this.isLocked()) {
            this.throwError("unlock", caller);
            return false;
        }
        this._lock = false;
        return true;
    }
    isLocked() {
        return this._lock === true;
    }
    throwError(fn, caller) {
        if (!this._throwErrors) {
            return;
        }
        throw new Error(`[${this._name}] Component ${caller} error on: ${fn}`);
    }
}
export default function getLock(options) {
    return new BpdLock(options !== null && options !== void 0 ? options : {});
}
