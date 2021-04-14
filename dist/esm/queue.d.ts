export declare type QueueAdapterType = 'batch' | 'single';
export interface IQueueAdapter<T> {
    type?: QueueAdapterType;
    onFlush(items: T[]): Promise<boolean>;
}
export interface QueueCompareCallback<T> {
    (item1: T, item2: T): boolean;
}
export interface QueueErrorCallback<T> {
    (e: unknown, counter: number, items?: T[]): void;
}
export interface QueueOptions {
    cleanQueueOnError?: boolean;
    errorLimit?: number;
}
/**
 * Provides basic implementation of queue.
 * It perform tasks as single - one by one or in batches - gets all queued tasks at the time.
 * Allows to remove task if it wasn't performed yet
 *
 * Queue gives only a basic logic - task execution is delegated to an adapter
 */
export declare class Queue<T> {
    private _items;
    private _lock;
    private _adapter;
    private _onError?;
    private _comparer?;
    private _options;
    private _errorCount;
    constructor(adapter: IQueueAdapter<T>, options?: QueueOptions);
    /**
     * Add item to a queue - it invokes flush right away
     * @param item
     */
    add(item: T): void;
    /**
     * Deletes item from task list
     * @param item
     */
    delete(item: T): T | undefined;
    /**
     * Indicates whether queue is locked
     */
    isLocked(): boolean;
    /**
     * Sets custom compare callback for cases where Object.is doesn't work
     * Used for delete
     * @param callback
     */
    setCompareCallback(callback: QueueCompareCallback<T>): void;
    /**
     * Sets callback to catch errors occured during flush execution
     * @param callback
     */
    onError(callback: QueueErrorCallback<T>): void;
    private compare;
    private flush;
    private cleanQueueOnError;
    private getItemsForFlush;
    private callError;
}
