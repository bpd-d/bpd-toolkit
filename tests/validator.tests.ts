import {
	equal,
	//	exists,
	field,
	match,
	max,
	min,
	ofType,
	range,
	schema,
	validate,
	validateSingleValue,
} from "../src/validator";
// describe("Tests checking validator", () => {

// })

describe("Tests checking validation method [min]", () => {
	it("Checks number larger than min", () => {
		const minFn = min(3);
		const res = minFn.callback(4);

		expect(res).toBeTrue();
	});

	it("Checks number smaller than min", () => {
		const minFn = min(3);
		const res = minFn.callback(2);

		expect(res).toBeFalse();
	});

	it("Checks number equal to min", () => {
		const minFn = min(3);
		const res = minFn.callback(3);

		expect(res).toBeTrue();
	});

	it("Checks string length larger than min", () => {
		const minFn = min(3);
		const res = minFn.callback("xxxx");

		expect(res).toBeTrue();
	});

	it("Checks string length smaller than min", () => {
		const minFn = min(3);
		const res = minFn.callback("xx");

		expect(res).toBeFalse();
	});

	it("Checks string equal to min", () => {
		const minFn = min(3);
		const res = minFn.callback("xxx");

		expect(res).toBeTrue();
	});

	it("Checks array length larger than min", () => {
		const minFn = min(3);
		const res = minFn.callback([1, 2, 3, 4]);

		expect(res).toBeTrue();
	});

	it("Checks array length smaller than min", () => {
		const minFn = min(3);
		const res = minFn.callback([1, 2]);

		expect(res).toBeFalse();
	});

	it("Checks array equal to min", () => {
		const minFn = min(3);
		const res = minFn.callback([1, 2, 3]);

		expect(res).toBeTrue();
	});

	it("Checks boolean length smaller than min", () => {
		const minFn = min(3);
		const res = minFn.callback(true);

		expect(res).toBeFalse();
	});
});

describe("Tests checking validation method [max]", () => {
	it("Checks number smaller than max", () => {
		const minFn = max(5);
		const res = minFn.callback(4);

		expect(res).toBeTrue();
	});

	it("Checks number larger than max", () => {
		const minFn = max(5);
		const res = minFn.callback(6);

		expect(res).toBeFalse();
	});

	it("Checks number equal to max", () => {
		const minFn = max(5);
		const res = minFn.callback(5);

		expect(res).toBeTrue();
	});

	it("Checks string smaller than max", () => {
		const minFn = max(5);
		const res = minFn.callback("xxxx");

		expect(res).toBeTrue();
	});

	it("Checks string larger than max", () => {
		const minFn = max(5);
		const res = minFn.callback("xxxxxxxx");

		expect(res).toBeFalse();
	});

	it("Checks string equal to max", () => {
		const minFn = max(5);
		const res = minFn.callback("xxxxx");

		expect(res).toBeTrue();
	});

	it("Checks array smaller than max", () => {
		const minFn = max(5);
		const res = minFn.callback([1, 2, 3, 4]);

		expect(res).toBeTrue();
	});

	it("Checks array larger than max", () => {
		const minFn = max(5);
		const res = minFn.callback([1, 2, 3, 4, 5, 6, 7]);

		expect(res).toBeFalse();
	});

	it("Checks array equal to max", () => {
		const minFn = max(5);
		const res = minFn.callback([1, 2, 3, 4, 5]);

		expect(res).toBeTrue();
	});
});

describe("Tests checking validation method [range]", () => {
	// Numbers
	it("Checks number smaller than range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback(1);

		expect(res).toBeFalse();
	});

	it("Checks number larger than range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback(6);

		expect(res).toBeFalse();
	});

	it("Checks number equal to min range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback(2);

		expect(res).toBeTrue();
	});

	it("Checks number equal to max range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback(5);

		expect(res).toBeTrue();
	});

	it("Checks number within range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback(4);

		expect(res).toBeTrue();
	});

	// String

	it("Checks string smaller than range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback("x");

		expect(res).toBeFalse();
	});

	it("Checks string larger than range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback("xxxxxx");

		expect(res).toBeFalse();
	});

	it("Checks string equal to min range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback("xx");

		expect(res).toBeTrue();
	});

	it("Checks string equal to max range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback("xxxxx");

		expect(res).toBeTrue();
	});

	it("Checks string within range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback("xxxx");

		expect(res).toBeTrue();
	});

	// Arrays

	it("Checks array smaller than range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback([1]);

		expect(res).toBeFalse();
	});

	it("Checks array larger than range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback([1, 2, 3, 4, 5, 6]);

		expect(res).toBeFalse();
	});

	it("Checks array equal to min range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback([1, 2]);

		expect(res).toBeTrue();
	});

	it("Checks array equal to max range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback([1, 2, 3, 4, 5]);

		expect(res).toBeTrue();
	});

	it("Checks array within range", () => {
		const minFn = range(2, 5);
		const res = minFn.callback([1, 2, 3, 4]);

		expect(res).toBeTrue();
	});
});

describe("Tests checking validation method [equal]", () => {
	it("Checks two equal numbers", () => {
		const fnObj = equal(2);
		const result = fnObj.callback(2);
		expect(result).toBeTrue();
	});

	it("Checks two different numbers", () => {
		const fnObj = equal(2);
		const result = fnObj.callback(3);
		expect(result).toBeFalse();
	});

	it("Checks two equal strings", () => {
		const fnObj = equal("x");
		const result = fnObj.callback("x");
		expect(result).toBeTrue();
	});

	it("Checks two different strings", () => {
		const fnObj = equal("x");
		const result = fnObj.callback("xx");
		expect(result).toBeFalse();
	});

	it("Checks two equal booleans", () => {
		const fnObj = equal(true);
		const result = fnObj.callback(true);
		expect(result).toBeTrue();
	});

	it("Checks two different booleans", () => {
		const fnObj = equal(true);
		const result = fnObj.callback(false);
		expect(result).toBeFalse();
	});

	it("Checks two different arrays", () => {
		const fnObj = equal([1, 2]);
		const result = fnObj.callback([1, 2, 3]);
		expect(result).toBeFalse();
	});
});

describe("Tests checking validation method [ofType]", () => {
	it("Returns true when type matches", () => {
		const fnObj = ofType("string");
		const result = fnObj.callback("XX");
		expect(result).toBeTrue();
	});

	it("Returns false when type does not match", () => {
		const fnObj = ofType("boolean");
		const result = fnObj.callback("XX");
		expect(result).toBeFalse();
	});
});

describe("Tests checking validation method [match]", () => {
	it("Matches string to string", () => {
		const fnObj = match("xx");
		const result = fnObj.callback("xx");

		expect(result).toBeTrue();
	});

	it("Does not match string to string", () => {
		const fnObj = match("xxxx");
		const result = fnObj.callback("xx");

		expect(result).toBeFalse();
	});

	it("Matches boolean to string", () => {
		const fnObj = match("true");
		const result = fnObj.callback(true);

		expect(result).toBeTrue();
	});

	it("Does not match boolean to string", () => {
		const fnObj = match("true");
		const result = fnObj.callback(false);

		expect(result).toBeFalse();
	});

	it("Matches Regex to string", () => {
		const fnObj = match(/x+y$/);
		const result = fnObj.callback("xxy");

		expect(result).toBeTrue();
	});

	it("Does not match Regex to string", () => {
		const fnObj = match(/x+y$/);
		const result = fnObj.callback("xx");

		expect(result).toBeFalse();
	});

	it("Matches Regex to boolean", () => {
		const fnObj = match(/t..e$/);
		const result = fnObj.callback(true);

		expect(result).toBeTrue();
	});

	it("Does not match Regex to boolean", () => {
		const fnObj = match(/t..e$/);
		const result = fnObj.callback(false);

		expect(result).toBeFalse();
	});
});

describe("Tests checking function [validateSingleValue]", () => {
	it("Returns true when all callbacks pass", () => {
		const validationCallbacks = [min(2), match("xx")];
		const result = validateSingleValue("prop", "xxxx", validationCallbacks);

		expect(result.result).toBeTrue();
	});

	it("Returns false when at least one callback fails", () => {
		const validationCallbacks = [min(2), match("xxy")];
		const result = validateSingleValue("prop", "xxxx", validationCallbacks);

		expect(result.result).toBeFalse();
		expect(result.error).toBeDefined();
		expect(result.error.steps.length).toEqual(1);
	});

	it("Breaks at first error", () => {
		const validationCallbacks = [ofType("number"), min(2), match("xxy")];
		const result = validateSingleValue("prop", "xxxx", validationCallbacks);

		expect(result.result).toBeFalse();
		expect(result.error).toBeDefined();
		expect(result.error.steps.length).toEqual(1);
	});

	it("Performs all checks when option is set", () => {
		const validationCallbacks = [ofType("number"), min(2), match("xxy")];
		const result = validateSingleValue(
			"prop",
			"xxxx",
			validationCallbacks,
			{
				checkAll: true,
			}
		);

		expect(result.result).toBeFalse();
		expect(result.error).toBeDefined();
		expect(result.error.steps.length).toEqual(2);
	});
});

describe("Tests checking validation method [validateObject]", () => {
	it("Returns true when all callbacks pass", () => {
		const schema = {
			name: [min(2), match("xx")],
			age: [range(18, 50)],
		};

		const obj = {
			name: "xxx",
			age: 19,
		};

		const result = validate(obj, schema);

		expect(result.result).toBeTrue();
	});

	it("Returns false when at least one validation fails", () => {
		const schema = {
			name: [min(2), match("xx")],
			age: [range(18, 50)],
		};

		const obj = {
			name: "xyx",
			age: 19,
		};

		const result = validate(obj, schema);

		expect(result.result).toBeFalse();
		expect(result.errors).toBeDefined();
		expect(result.errors.length).toEqual(1);
	});

	it("Performs validation of all props when checkAll is set", () => {
		const schema = {
			name: [min(2), match("xx")],
			age: [range(18, 50)],
		};

		const obj = {
			name: "xyx",
			age: 10,
		};

		const result = validate(obj, schema, { checkAll: true });

		expect(result.result).toBeFalse();
		expect(result.errors).toBeDefined();
		expect(result.errors.length).toEqual(2);
	});
});

describe("Tests checking field builder", () => {
	it("It creates files schema field from callbacks", () => {
		const sField = field<any>("x").set(ofType("string"), min(5));
		const built = sField.build();
		expect(built.name).toEqual("x");
		expect(built.callbacks.length).toEqual(2);
		expect(built.callbacks[0].name).toEqual("ofType");
		expect(built.callbacks[1].name).toEqual("min");
	});
});

describe("Tests checking schema builder", () => {
	it("Creates schema from provided structure", () => {
		const sCh = schema<any>({
			x: {
				type: "string",
				min: 5,
			},
			y: {
				match: "xx",
				range: [2, 5],
			},
		});

		const built = sCh.build();

		expect(built.x).toBeDefined();
		expect(built.x.length).toEqual(2);
		expect(built.x[0].name).toEqual("ofType");
		expect(built.x[1].name).toEqual("min");

		expect(built.y).toBeDefined();
		expect(built.y.length).toEqual(2);
		expect(built.y[0].name).toEqual("match");
		expect(built.y[1].name).toEqual("range");
	});

	it("Creates schema from provided fields via method [define]", () => {
		const sCh = schema<any>().define(
			field("x").set(ofType("string"), min(5)),
			field("y").set(match("xx"), range(2, 5))
		);

		const built = sCh.build();

		expect(built.x).toBeDefined();
		expect(built.x.length).toEqual(2);
		expect(built.x[0].name).toEqual("ofType");
		expect(built.x[1].name).toEqual("min");

		expect(built.y).toBeDefined();
		expect(built.y.length).toEqual(2);
		expect(built.y[0].name).toEqual("match");
		expect(built.y[1].name).toEqual("range");
	});

	it("Creates schema from provided fields via method [set]", () => {
		const sCh = schema<any>()
			.set("x", ofType("string"), min(5))
			.set("y", match("xx"), range(2, 5));

		const built = sCh.build();

		expect(built.x).toBeDefined();
		expect(built.x.length).toEqual(2);
		expect(built.x[0].name).toEqual("ofType");
		expect(built.x[1].name).toEqual("min");

		expect(built.y).toBeDefined();
		expect(built.y.length).toEqual(2);
		expect(built.y[0].name).toEqual("match");
		expect(built.y[1].name).toEqual("range");
	});
});
