import { smartSwitch, SmartSwitchOptions } from '../src/switch';

function getA(arg: string): string | undefined {
    return arg === 'A' ? "A" : undefined;
}

function getB(arg: string): string | undefined {
    return arg === 'B' ? "B" : undefined;
}

function getB2(arg: string): string | undefined {
    return arg === 'B' ? "B2" : undefined;
}

function getCAsync(arg: string): Promise<string> | undefined {
    async function ret() {
        return "C";
    }
    return arg === 'C' ? ret() : undefined;
}

function getD(arg: string): () => string | undefined {
    return arg === 'D' ? () => {
        return "D";
    } : undefined;
}

describe("Tests checking method [smartSwitch]", function () {
    let options: SmartSwitchOptions<string, string> = null;
    beforeEach(() => {
        options = {
            conditions: [
                getA, getB, getCAsync, getB2, getD
            ]
        }
    })

    it("Base test", async function () {
        let result = await smartSwitch<string, string>('B', options);
        expect(result).toEqual("B");
    })

    it("Base test - no match", async function () {
        let result = await smartSwitch<string, string>('Z', options);
        expect(result).toBeUndefined();
    })

    it("Base test - no match with default", async function () {
        let result = await smartSwitch<string, string>('Z', { ...options, default: "X" });
        expect(result).toEqual('X');
    })

    it("Base test - multi", async function () {
        let result = await smartSwitch<string, string>('B', { ...options, multi: true });
        expect(result).toEqual("B2");
    })

    it("Base test - promise", async function () {
        let result = await smartSwitch<string, string>('C', options);
        expect(result).toEqual("C");
    })

    it("Base test - return function", async function () {
        let result = await smartSwitch<string, string>('D', options);
        expect(result).toEqual("D");
    })
})