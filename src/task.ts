export interface Comparer<T> {
    (value1?: T, value2?: T): boolean;
}

export interface TaskCallback<T, V> {
    (arg?: T): V | Promise<V>;
}

export interface TaskExecutorResultCallback<T, V> {
    (arg?: T): Promise<V>;
}

export interface TaskExecutor<T, V> {
    (arg: TaskCallback<T, V>): TaskExecutorResultCallback<T, V>;
}

export interface TaskLogCallback {
    (message: string, timestamp: number, taskCount: number): void;
}

interface TaskData<T, V> {
    arg: T | undefined;
    promise: Promise<V>;
    ctx?: number;
}

function ObjectComparer<T>(value1: T, value2: T): boolean {
    return Object.is(value1, value2);
}

function CallbackExecutor<T, V>(callback: TaskCallback<T, V>): TaskExecutorResultCallback<T, V> {
    return function (arg?: T) {
        return new Promise((resolve, reject) => {
            try {
                resolve(callback(arg))
            } catch (e) {
                reject(e);
            }
        })
    }
}

function CallbackTimeoutExecutor<T, V>(callback: TaskCallback<T, V>, timeout: number): TaskExecutorResultCallback<T, V> {
    return function (arg?: T) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(callback(arg))
                } catch (e) {
                    reject(e);
                }
            }, timeout)

        })
    }
}


export default class Task<T, V> {
    #tasks: TaskData<T, V>[];
    #counter: number;
    #executor: TaskExecutorResultCallback<T, V>;
    #log: TaskLogCallback | undefined;
    #comparer: Comparer<T>;

    constructor(callback: TaskCallback<T, V>, timeout?: number) {
        this.#log = undefined;
        this.#comparer = ObjectComparer;
        this.#counter = 0;
        this.#tasks = [];
        if (!callback) {
            throw new Error("Callback is incorrect");
        }
        this.#executor = timeout && timeout > -1 ? CallbackTimeoutExecutor(callback, timeout) : CallbackExecutor(callback);
    }

    call(t?: T) {
        let found = this.#tasks.find(task => this.#comparer(t, task.arg));
        if (found) {
            return found.promise;
        }
        let count = this.#counter++;
        const task: TaskData<T, V> = {
            ctx: count,
            arg: t,
            promise: new Promise((resolve, reject) => {
                this.debug("New task: " + count)
                this.#executor(t).then(
                    (v: V) => {
                        this.debug("Task executed: " + count);
                        resolve(v);
                    },
                    (e: Error) => {
                        this.debug("Task rejected: " + count + ": " + e.message)
                        reject(e);
                    }).catch((err) => {
                        reject(err)
                    }).finally(() => {
                        const index = this.#tasks.findIndex(ta => ta.ctx === count);
                        if (index > -1) {
                            this.#tasks.splice(index, 1);
                            this.debug("Task finished: " + count)
                        }
                    })
            })
        }
        this.#tasks.push(task);
        return task.promise;
    }

    setLogger(callback: TaskLogCallback) {
        this.#log = callback;
    }

    setComparer(comparer: Comparer<T>): void {
        this.#comparer = comparer;
    }

    private debug(message: string) {
        if (this.#log) {
            this.#log(message, Date.now(), this.#tasks.length);
        }
    }

}