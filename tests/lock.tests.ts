import getLock from "../src/lock";


describe("Tests checking method [IBpdLock]", function () {

    it("Lock properly", () => {
        const lock = getLock();
        const result = lock.lock();

        expect(result).toBeTrue();
    })

    it("Return false when locking object that is locked", () => {
        const lock = getLock();
        lock.lock();
        const result = lock.lock();

        expect(result).toBeFalse();
    })

    it("Unlock properly", () => {
        const lock = getLock();
        lock.lock();
        const result = lock.unlock();

        expect(result).toBeTrue();
    })

    it("Return false when unlocking object that is unlocked", () => {
        const lock = getLock();
        const result = lock.unlock();

        expect(result).toBeFalse();
    })

    it("Throws error when unlocking not locked object", () => {
        const lock = getLock({
            throwErrors: true
        });
        let error = false;
        try {
            lock.unlock();
        } catch (e) {
            error = true
        }

        expect(error).toBeTrue();
    })

    it("Throws error when locking locked object", () => {
        const lock = getLock({
            throwErrors: true
        });
        let error = false;
        try {
            lock.lock();
            lock.lock();
        } catch (e) {
            error = true
        }

        expect(error).toBeTrue();
    })

    it("Checks method [isLocked]", () => {
        const lock = getLock();
        lock.lock();
        const first = lock.isLocked();
        lock.unlock();
        const second = lock.isLocked();


        expect(first).toBeTrue();
        expect(second).toBeFalse();
    })

    it("Uses initial value", () => {
        const lock = getLock({
            initial: true
        });
        const first = lock.isLocked();
        expect(first).toBeTrue();
    })
})