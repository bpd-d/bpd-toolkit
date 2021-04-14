export type QueueAdapterType = 'batch' | 'single';

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
export class Queue<T> {
    private _items: T[];
    private _lock: boolean;
    private _adapter: IQueueAdapter<T>;
    private _onError?: QueueErrorCallback<T>;
    private _comparer?: QueueCompareCallback<T>;
    private _options: QueueOptions;
    private _errorCount: number;

    constructor(adapter: IQueueAdapter<T>, options?: QueueOptions) {
        this._lock = false;
        this._items = [];
        this._adapter = adapter;
        this._comparer = undefined;
        this._onError = undefined;
        this._errorCount = 0;
        this._options = {
            cleanQueueOnError: false,
            errorLimit: 10
        }

        if (options) {
            this._options = {
                ...this._options,
                ...options
            }
        }
    }

    /**
     * Add item to a queue - it invokes flush right away
     * @param item 
     */
    add(item: T): void {
        this._items.push(item);
        if (this._lock) {
            return;
        }

        this._lock = true;
        this.flush().then(() => {
            this._lock = false;
        })
    }

    /**
     * Deletes item from task list 
     * @param item 
     */
    delete(item: T): T | undefined {
        const index = this._items.findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return this._items.splice(index, 1)[0];
    }

    /**
     * Indicates whether queue is locked
     */
    isLocked(): boolean {
        return this._lock;
    }

    /**
     * Sets custom compare callback for cases where Object.is doesn't work
     * Used for delete
     * @param callback 
     */
    setCompareCallback(callback: QueueCompareCallback<T>) {
        this._comparer = callback;
    }

    /**
     * Sets callback to catch errors occured during flush execution
     * @param callback 
     */
    onError(callback: QueueErrorCallback<T>) {
        this._onError = callback;
    }

    private compare(item1: T, item2: T): boolean {
        if (this._comparer) {
            return this._comparer(item1, item2)
        }
        return Object.is(item1, item2);
    }

    private async flush(): Promise<boolean> {
        const items = this.getItemsForFlush();
        if (items.length === 0) {
            return true;
        }
        try {
            await this._adapter.onFlush(items);
            this._errorCount = 0;
        } catch (e) {
            this._errorCount += 1;
            this.callError(e, items);
            this.cleanQueueOnError();
        }

        return this.flush();
    }

    private cleanQueueOnError() {
        if (this._options.cleanQueueOnError && this._options.errorLimit && this._errorCount >= this._options.errorLimit) {
            this._items = [];
            this._errorCount = 0;
            this.callError("Errors limit has been reached: " + this._options.errorLimit, [])
        }
    }

    private getItemsForFlush(): T[] {
        if (this._adapter.type === 'batch') {
            let result = [...this._items];
            this._items = []
            return result;
        }
        const item = this._items.shift();
        if (item) {
            return [item];
        }
        return [];
    }

    private callError(error: unknown, items?: T[]) {
        if (this._onError) {
            this._onError(error, this._errorCount, items)
        }
    }
}