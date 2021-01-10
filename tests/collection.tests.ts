import { findFirst, where } from "../src/collection";
describe("Tests checking method [where]", function () {
    let collection: string[];
    beforeAll(() => {
        collection = ["first", "second", "third", "fourth", "first", "second", "third", "fourth"];
    })

    it("Returns proper collection on proper condition", () => {
        let out: string[] = undefined;

        out = where(collection, (item: string) => {
            return item === 'first';
        })

        expect(out).toBeDefined();
        expect(out.length).toEqual(2);
    })

    it("Returns empty collection when no item matches", () => {
        let out: string[] = undefined;

        out = where(collection, (item: string) => {
            return item === 'XXX';
        })

        expect(out).toBeDefined();
        expect(out.length).toEqual(0);
    })

    it("Returns empty collection when no item matches", () => {
        let out: string[] = undefined;

        out = where(null, (item: string) => {
            return item === 'XXX';
        })

        expect(out).toBeUndefined();
    })
})

describe("Tests checking method [findFirst]", function () {
    let collection: string[];
    beforeAll(() => {
        collection = ["first", "second", "third", "fourth", "first", "second", "third", "fourth"];
    })

    it("Returns proper item on proper condition", () => {
        let out: [string, number] = undefined;
        let toFind = "second";

        out = findFirst(collection, (item: string) => {
            return item === toFind;
        })

        expect(out).toBeDefined();
        expect(out.length).toEqual(2);
        expect(out[0]).toEqual(toFind);
        expect(out[1]).toEqual(1);
    })

    it("Returns undefined when item is not found", () => {
        let out: [string, number] = undefined;
        let toFind = "XXX";

        out = findFirst(collection, (item: string) => {
            return item === toFind;
        })

        expect(out).toBeUndefined();
    })

    it("Returns undefined when collection is empty", () => {
        let out: [string, number] = undefined;
        let toFind = "XXX";

        out = findFirst([], (item: string) => {
            return item === toFind;
        })

        expect(out).toBeUndefined();
    })

})