export interface IBpdLock {
    lock(caller?: string): boolean;
    unlock(caller?: string): boolean;
    isLocked(): boolean;
}
export interface BpdLockOptions {
    throwErrors?: boolean;
    initial?: boolean;
    name?: string;
}
declare class BpdLock implements IBpdLock {
    private _lock;
    private _throwErrors;
    private _name;
    constructor(options: BpdLockOptions);
    lock(caller?: string): boolean;
    unlock(caller?: string): boolean;
    isLocked(): boolean;
    private throwError;
}
export default function getLock(options?: BpdLockOptions): BpdLock;
export {};
