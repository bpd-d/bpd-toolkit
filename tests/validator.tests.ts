import {
	compare,
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
	ValidationCallback,
} from "../src/validator";
// describe("Tests checking validator", () => {

// })

describe("Tests checking validation method [min]", () => {
	it("Checks number larger than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback(4, null, null);

		expect(res).toBeTrue();
	});

	it("Checks number smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback(2, null, null);

		expect(res).toBeFalse();
	});

	it("Checks number equal to min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback(3, null, null);

		expect(res).toBeTrue();
	});

	it("Checks string length larger than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback("xxxx", null, null);

		expect(res).toBeTrue();
	});

	it("Checks string length smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback("xx", null, null);

		expect(res).toBeFalse();
	});

	it("Checks string equal to min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback("xxx", null, null);

		expect(res).toBeTrue();
	});

	it("Checks array length larger than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback([1, 2, 3, 4], null, null);

		expect(res).toBeTrue();
	});

	it("Checks array length smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback([1, 2], null, null);

		expect(res).toBeFalse();
	});

	it("Checks array equal to min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback([1, 2, 3], null, null);

		expect(res).toBeTrue();
	});

	it("Checks boolean length smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn.callback(true, null, null);

		expect(res).toBeFalse();
	});
});

describe("Tests checking validation method [max]", () => {
	it("Checks number smaller than max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback(4, null, null);

		expect(res).toBeTrue();
	});

	it("Checks number larger than max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback(6, null, null);

		expect(res).toBeFalse();
	});

	it("Checks number equal to max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback(5, null, null);

		expect(res).toBeTrue();
	});

	it("Checks string smaller than max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback("xxxx", null, null);

		expect(res).toBeTrue();
	});

	it("Checks string larger than max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback("xxxxxxxx", null, null);

		expect(res).toBeFalse();
	});

	it("Checks string equal to max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback("xxxxx", null, null);

		expect(res).toBeTrue();
	});

	it("Checks array smaller than max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback([1, 2, 3, 4], null, null);

		expect(res).toBeTrue();
	});

	it("Checks array larger than max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback([1, 2, 3, 4, 5, 6, 7], null, null);

		expect(res).toBeFalse();
	});

	it("Checks array equal to max", () => {
		const minFn = max<any>(5);
		const res = minFn.callback([1, 2, 3, 4, 5], null, null);

		expect(res).toBeTrue();
	});
});

describe("Tests checking validation method [range]", () => {
	// Numbers
	it("Checks number smaller than range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback(1, null, null);

		expect(res).toBeFalse();
	});

	it("Checks number larger than range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback(6, null, null);

		expect(res).toBeFalse();
	});

	it("Checks number equal to min range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback(2, null, null);

		expect(res).toBeTrue();
	});

	it("Checks number equal to max range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback(5, null, null);

		expect(res).toBeTrue();
	});

	it("Checks number within range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback(4, null, null);

		expect(res).toBeTrue();
	});

	// String

	it("Checks string smaller than range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback("x", null, null);

		expect(res).toBeFalse();
	});

	it("Checks string larger than range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback("xxxxxx", null, null);

		expect(res).toBeFalse();
	});

	it("Checks string equal to min range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback("xx", null, null);

		expect(res).toBeTrue();
	});

	it("Checks string equal to max range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback("xxxxx", null, null);

		expect(res).toBeTrue();
	});

	it("Checks string within range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback("xxxx", null, null);

		expect(res).toBeTrue();
	});

	// Arrays

	it("Checks array smaller than range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback([1], null, null);

		expect(res).toBeFalse();
	});

	it("Checks array larger than range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback([1, 2, 3, 4, 5, 6], null, null);

		expect(res).toBeFalse();
	});

	it("Checks array equal to min range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback([1, 2], null, null);

		expect(res).toBeTrue();
	});

	it("Checks array equal to max range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback([1, 2, 3, 4, 5], null, null);

		expect(res).toBeTrue();
	});

	it("Checks array within range", () => {
		const minFn = range<any>(2, 5);
		const res = minFn.callback([1, 2, 3, 4], null, null);

		expect(res).toBeTrue();
	});
});

describe("Tests checking validation method [equal]", () => {
	it("Checks two equal numbers", () => {
		const fnObj = equal<any>(2);
		const result = fnObj.callback(2, null, null);
		expect(result).toBeTrue();
	});

	it("Checks two different numbers", () => {
		const fnObj = equal<any>(2);
		const result = fnObj.callback(3, null, null);
		expect(result).toBeFalse();
	});

	it("Checks two equal strings", () => {
		const fnObj = equal<any>("x");
		const result = fnObj.callback("x", null, null);
		expect(result).toBeTrue();
	});

	it("Checks two different strings", () => {
		const fnObj = equal<any>("x");
		const result = fnObj.callback("xx", null, null);
		expect(result).toBeFalse();
	});

	it("Checks two equal booleans", () => {
		const fnObj = equal<any>(true);
		const result = fnObj.callback(true, null, null);
		expect(result).toBeTrue();
	});

	it("Checks two different booleans", () => {
		const fnObj = equal<any>(true);
		const result = fnObj.callback(false, null, null);
		expect(result).toBeFalse();
	});

	it("Checks two different arrays", () => {
		const fnObj = equal<any>([1, 2]);
		const result = fnObj.callback([1, 2, 3], null, null);
		expect(result).toBeFalse();
	});
});

describe("Tests checking validation method [ofType]", () => {
	it("Returns true when type matches", () => {
		const fnObj = ofType<any>("string");
		const result = fnObj.callback("XX", null, null);
		expect(result).toBeTrue();
	});

	it("Returns false when type does not match", () => {
		const fnObj = ofType<any>("boolean");
		const result = fnObj.callback("XX", null, null);
		expect(result).toBeFalse();
	});
});

describe("Tests checking validation method [match]", () => {
	it("Matches string to string", () => {
		const fnObj = match<any>("xx");
		const result = fnObj.callback("xx", null, null);

		expect(result).toBeTrue();
	});

	it("Does not match string to string", () => {
		const fnObj = match<any>("xxxx");
		const result = fnObj.callback("xx", null, null);

		expect(result).toBeFalse();
	});

	it("Matches boolean to string", () => {
		const fnObj = match<any>("true");
		const result = fnObj.callback(true, null, null);

		expect(result).toBeTrue();
	});

	it("Does not match boolean to string", () => {
		const fnObj = match<any>("true");
		const result = fnObj.callback(false, null, null);

		expect(result).toBeFalse();
	});

	it("Matches Regex to string", () => {
		const fnObj = match<any>(/x+y$/);
		const result = fnObj.callback("xxy", null, null);

		expect(result).toBeTrue();
	});

	it("Does not match Regex to string", () => {
		const fnObj = match<any>(/x+y$/);
		const result = fnObj.callback("xx", null, null);

		expect(result).toBeFalse();
	});

	it("Matches Regex to boolean", () => {
		const fnObj = match<any>(/t..e$/);
		const result = fnObj.callback(true, null, null);

		expect(result).toBeTrue();
	});

	it("Does not match Regex to boolean", () => {
		const fnObj = match<any>(/t..e$/);
		const result = fnObj.callback(false, null, null);

		expect(result).toBeFalse();
	});
});

describe("Tests checking method [compare]", () => {
	const testObject = {
		name: "name",
		name2: "name",
		lastname: "lastname",
	};

	it("Compares two fields with the same value", () => {
		const fnObj = compare<any>("name2");
		const result = fnObj.callback("name", "name", testObject);

		expect(result).toBeTrue();
	});

	it("Compares two fields with different values", () => {
		const fnObj = compare<any>("lastname");
		const result = fnObj.callback("name", "name", testObject);

		expect(result).toBeFalse();
	});

	it("Compares two fields with different values where comparable does not exist", () => {
		const fnObj = compare<any>("xxx");
		const result = fnObj.callback("name", "name", testObject);

		expect(result).toBeFalse();
	});
});

describe("Tests checking function [validateSingleValue]", () => {
	it("Returns true when all callbacks pass", () => {
		const validationCallbacks: ValidationCallback<any>[] = [
			min(2),
			match("xx"),
		];
		const result = validateSingleValue<any>(
			"prop",
			"xxxx",
			null,
			validationCallbacks
		);

		expect(result.result).toBeTrue();
	});

	it("Returns false when at least one callback fails", () => {
		const validationCallbacks = [min(2), match("xxy")];
		const result = validateSingleValue<any>(
			"prop",
			"xxxx",
			null,
			validationCallbacks
		);

		expect(result.result).toBeFalse();
		expect(result.error).toBeDefined();
		expect(result.error.steps.length).toEqual(1);
	});

	it("Breaks at first error", () => {
		const validationCallbacks = [ofType("number"), min(2), match("xxy")];
		const result = validateSingleValue<any>(
			"prop",
			"xxxx",
			null,
			validationCallbacks
		);

		expect(result.result).toBeFalse();
		expect(result.error).toBeDefined();
		expect(result.error.steps.length).toEqual(1);
	});

	it("Performs all checks when option is set", () => {
		const validationCallbacks = [ofType("number"), min(2), match("xxy")];
		const result = validateSingleValue<any>(
			"prop",
			"xxxx",
			null,
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
