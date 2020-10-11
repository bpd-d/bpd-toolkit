import { are, clone, counter, createElementFromString, Debounce, enumerateObject, getRangeValue, hasFunction, is, isInRange, sleep } from "../src/index"
import { ObjectToEnumerate, SampleClass } from "./helpers/helpers"

describe("Tests checking method [is]", function () {
    it("Shall return true when object is not empty", function () {
        let obj: any = { a: 1 }
        let emptyobj: any = {}
        let str: string = "dsd"
        let num: number = 10
        let negnum: number = 10
        let arr: string[] = ['aa']

        expect(is(obj)).toEqual(true, "Not empty object")
        expect(is(emptyobj)).toEqual(true, "Empty object")
        expect(is(str)).toEqual(true, "Not empty string")
        expect(is(num)).toEqual(true, "Positive number")
        expect(is(negnum)).toEqual(true, "Negative number")
        expect(is(arr)).toEqual(true, "Not empty array")
    })

    it("Shall return false when object is empty", function () {
        let obj: any = {}
        let str: string = ""
        let someNull: any = null
        let arr: string[] = []
        //let undef: any;

        expect(is(str)).toEqual(false, "Empty string")
        expect(is(someNull)).toEqual(false, "Null object")
        expect(is(arr)).toEqual(false, "Empty array")
    })
})


describe("Tests checking method [createElementFromString]", function () {
    it("Shall return Element created from html string", function () {
        let htmlString: string = `<div class="someClass"></div>`
        let failed: boolean = false;
        let output: Element = null;
        try {
            output = createElementFromString(htmlString)
        } catch (e) {
            failed = true
        }

        expect(failed).toBe(false, "Shall not fail");
        expect(is(output)).toBe(true, "Element shall be created")
        expect(output).toHaveClass("someClass", "Shall contain class");
    })

    it("Shall return null from empty or incorrect html string", function () {
        let commonString: string = `dsadasd`
        let emptyString: string = null
        let failed: boolean = false;
        let output: Element = null;
        let failed2: boolean = false;
        let output2: Element = null;
        try {
            output = createElementFromString(commonString)
        } catch (e) {
            failed = true
        }

        try {
            output2 = createElementFromString(emptyString)
        } catch (e) {
            failed2 = true
        }

        expect(failed).toBe(false, "Shall not fail on not html string");
        expect(is(output)).toBe(false, "Element shall be null");

        expect(failed2).toBe(false, "Shall not fail on empty or null string");
        expect(is(output2)).toBe(false, "Element shall be null when string is null");
    })
})

describe("Tests checking method [getRangeValue]", function () {
    it("Shall return value within the range", function () {
        let value: number = 10;
        let min: number = 0;
        let max: number = 15;

        expect(getRangeValue(value, min, max)).toBe(value, "Value shall be the same as input");
    })

    it("Shall return max or min when value is outside of range", function () {
        let value: number = 16;
        let value2: number = -2;
        let min: number = 0;
        let max: number = 15;

        expect(getRangeValue(value, min, max)).toBe(max, "Value shall be the max from range");
        expect(getRangeValue(value2, min, max)).toBe(min, "Value shall be the min from range");
    })
})

describe("Tests checking method [clone]", function () {
    it("Shall return cloned object", function () {
        let obj1: any = { a: 1 };
        let obj2: any = { a: 1, b: () => { return true; } };
        let obj3: any = null;

        let out1 = clone(obj1);
        let out2 = clone(obj2);
        let out3 = clone(obj3);

        expect(out1.a).toEqual(obj1.a)
        expect(out2.b()).toEqual(obj2.b())
        expect(out3).toEqual(undefined)
    })
})

describe("Tests checking method [are]", function () {
    it("Shall return true when all values are proper values", function () {
        let output = are('test', 0, 1, {})
        expect(output).toBeTrue()
    })

    it("Shall return false when at least one value doesn't have proper value", function () {
        let output = are('test', 0, -1, null)
        expect(output).toBeFalse()
    })

    it("Shall return false when at least one value doesn't have proper value 2", function () {
        let output = are('test', 0, '', {})
        expect(output).toBeFalse()
    })
})


// describe("Tests checking method [jsonify]", function () {
//     it("Outputs a proper string", function () {
//         let str = `{"a":"-1", "b": "-2"}`;
//         let out = jsonify(str);
//         expect(out.a).toContain("-1");
//         expect(out.b).toEqual("-2");
//     })

//     it("Outputs proper string when not all argument are passed", function () {
//         let str = `{"a":"-1"; "b": "-2"}`;
//         let out = null;
//         let failed = false;
//         try {
//             let out = jsonify(str);
//         } catch (e) {
//             failed = true;
//         }
//         expect(out).toBe(null);
//         expect(failed).toBeTrue();
//     })
// })

describe("Tests checking method [isInRange]", function () {
    it("Returns true when value is in range", function () {
        let out = isInRange(1, 0, 10);
        expect(out).toBeTrue();
    })

    it("Returns false when value is in range", function () {
        let out = isInRange(-2, 0, 10);
        expect(out).toBeFalse();
    })
})

describe("Tests checking method [hasFunction]", function () {
    it("Normal case", function () {
        let obj = new SampleClass();
        let has = hasFunction(obj, 'someFunction');

        expect(has).toBeTrue();
    })

    it("Not existing", function () {
        let obj = new SampleClass();
        let has = hasFunction(obj, 'someFunction1');

        expect(has).toBeFalse();
    })
})

describe("Tests checking method [enumerateObject]", function () {
    it("Normal case", function () {
        let obj = new ObjectToEnumerate();
        let val = null
        let val2 = null
        enumerateObject(obj, (property: string, value: string) => {
            if (property == 'prop1') {
                val = value;
            } else if (property == 'prop2') {
                val2 = value
            }
        });

        expect(val).toEqual(obj.prop1);
        expect(val2).toEqual(obj.prop2);
    })
})

describe("Tests checking method [counter]", function () {
    it("Normal case", function () {
        let count = counter();
        let val = count.next().value;
        let val2 = count.next().value;


        expect(val).toEqual(0);
        expect(val2).toEqual(1);
    })
})


describe("Tests checking class [Debounce]", function () {
    it("No arguments", async function () {
        let val = null;
        let debounce = new Debounce(() => {
            val = "XXX"
        }, 100);
        debounce.call();
        await sleep(110);

        expect(val).toEqual("XXX");
    })

    it("With argument", async function () {
        let val = null;
        let debounce = new Debounce((arg: string) => {
            val = arg
        }, 100);
        debounce.call("XXX");
        await sleep(110);

        expect(val).toEqual("XXX");
    })

    it("Mulitple calls with argument", async function () {
        let val = null;
        let debounce = new Debounce((arg: string) => {
            val = arg
        }, 100);
        debounce.call("XXX");
        await sleep(50);
        debounce.call("YYY");
        await sleep(110);

        expect(val).toEqual("YYY");
    })
})