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
export default class Task<T, V> {
    #private;
    constructor(callback: TaskCallback<T, V>, timeout?: number);
    call(t?: T): Promise<V>;
    setLogger(callback: TaskLogCallback): void;
    setComparer(comparer: Comparer<T>): void;
    private debug;
}
