import Task from '../src/task';
import { SimpleCallback, TestPromiseFactory, ThrowingCallback } from './helpers/callbacks';
describe("Tests checking class [Task]", async function () {
    it("Initializes properly", () => {
        const task = new Task<string, string>(SimpleCallback);
        expect(task).toBeDefined();
    })

    it("Throws error when initialized with empty callback", () => {
        let error = false;
        try {
            const task = new Task<string, string>(null);
        } catch (e) {
            error = true;
        }

        expect(error).toBeTrue();
    })

    it("Runs task", async () => {
        const task = new Task<string, string>(SimpleCallback);
        let result = await task.call("XXX");
        expect(result).toEqual("XXX");
    })

    it("Runs delayed task", async () => {
        const task = new Task<string, string>(SimpleCallback, 100);
        let result = await task.call("XXX");
        expect(result).toEqual("XXX");
    })

    it("Runs mulitple delayed tasks", async () => {
        const task = new Task<string, string>(SimpleCallback, 200);
        let results: string[] = await Promise.all([task.call("XXX"), task.call("XXX"), task.call("YYY")]);

        expect(results[0]).toEqual("XXX");
        expect(results[1]).toEqual("XXX");
        expect(results[2]).toEqual("YYY");
    })

    it("Runs promised task", async () => {
        const task = new Task<string, string>(TestPromiseFactory);
        let result = await task.call("XXX");
        expect(result).toEqual("XXX");
    })

    it("Catches error when callback throws error", async () => {
        const task = new Task<string, string>(ThrowingCallback, 100);
        let result = undefined;
        let error = undefined;
        try {
            result = await task.call("XXX");
        } catch (e) {
            error = e
        }
        expect(result).toBeUndefined();
        expect(error).toBeDefined();
    })

    it("Debug logger shall log", async () => {
        const task = new Task<string, string>(SimpleCallback, 100);
        const logs = [];
        task.setLogger((message) => {
            logs.push(message);
        })
        const result = await task.call('XXX');
        expect(result).toEqual('XXX');
        expect(logs.length).toBeGreaterThan(0);

    })
})