var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _tasks, _counter, _executor, _log, _comparer;
function ObjectComparer(value1, value2) {
    return Object.is(value1, value2);
}
function CallbackExecutor(callback) {
    return function (arg) {
        return new Promise((resolve, reject) => {
            try {
                resolve(callback(arg));
            }
            catch (e) {
                reject(e);
            }
        });
    };
}
function CallbackTimeoutExecutor(callback, timeout) {
    return function (arg) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(callback(arg));
                }
                catch (e) {
                    reject(e);
                }
            }, timeout);
        });
    };
}
export default class Task {
    constructor(callback, timeout) {
        _tasks.set(this, void 0);
        _counter.set(this, void 0);
        _executor.set(this, void 0);
        _log.set(this, void 0);
        _comparer.set(this, void 0);
        __classPrivateFieldSet(this, _log, undefined);
        __classPrivateFieldSet(this, _comparer, ObjectComparer);
        __classPrivateFieldSet(this, _counter, 0);
        __classPrivateFieldSet(this, _tasks, []);
        if (!callback) {
            throw new Error("Callback is incorrect");
        }
        __classPrivateFieldSet(this, _executor, timeout && timeout > -1 ? CallbackTimeoutExecutor(callback, timeout) : CallbackExecutor(callback));
    }
    call(t) {
        var _a;
        let found = __classPrivateFieldGet(this, _tasks).find(task => __classPrivateFieldGet(this, _comparer).call(this, t, task.arg));
        if (found) {
            return found.promise;
        }
        let count = (__classPrivateFieldSet(this, _counter, (_a = +__classPrivateFieldGet(this, _counter)) + 1), _a);
        const task = {
            ctx: count,
            arg: t,
            promise: new Promise((resolve, reject) => {
                this.debug("New task: " + count);
                __classPrivateFieldGet(this, _executor).call(this, t).then((v) => {
                    this.debug("Task executed: " + count);
                    resolve(v);
                }, (e) => {
                    this.debug("Task rejected: " + count + ": " + e.message);
                    reject(e);
                }).catch((err) => {
                    reject(err);
                }).finally(() => {
                    const index = __classPrivateFieldGet(this, _tasks).findIndex(ta => ta.ctx === count);
                    if (index > -1) {
                        __classPrivateFieldGet(this, _tasks).splice(index, 1);
                        this.debug("Task finished: " + count);
                    }
                });
            })
        };
        __classPrivateFieldGet(this, _tasks).push(task);
        return task.promise;
    }
    setLogger(callback) {
        __classPrivateFieldSet(this, _log, callback);
    }
    setComparer(comparer) {
        __classPrivateFieldSet(this, _comparer, comparer);
    }
    debug(message) {
        if (__classPrivateFieldGet(this, _log)) {
            __classPrivateFieldGet(this, _log).call(this, message, Date.now(), __classPrivateFieldGet(this, _tasks).length);
        }
    }
}
_tasks = new WeakMap(), _counter = new WeakMap(), _executor = new WeakMap(), _log = new WeakMap(), _comparer = new WeakMap();
