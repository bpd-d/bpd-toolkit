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
		const res = minFn(4, null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks number smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn(2, null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks number equal to min", () => {
		const minFn = min<any>(3);
		const res = minFn(3, null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks string length larger than min", () => {
		const minFn = min<any>(3);
		const res = minFn("xxxx", null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks string length smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn("xx", null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks string equal to min", () => {
		const minFn = min<any>(3);
		const res = minFn("xxx", null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks array length larger than min", () => {
		const minFn = min<any>(3);
		const res = minFn([1, 2, 3, 4], null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks array length smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn([1, 2], null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks array equal to min", () => {
		const minFn = min<any>(3);
		const res = minFn([1, 2, 3], null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks boolean length smaller than min", () => {
		const minFn = min<any>(3);
		const res = minFn(true, null, null);

		expect(res.status).toBeFalse();
	});
});

describe("Tests checking validation method [max]", () => {
	it("Checks number smaller than max", () => {
		const maxFn = max<any>(5);
		const res = maxFn(4, null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks number larger than max", () => {
		const maxFn = max<any>(5);
		const res = maxFn(6, null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks number equal to max", () => {
		const maxFn = max<any>(5);
		const res = maxFn(5, null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks string smaller than max", () => {
		const maxFn = max<any>(5);
		const res = maxFn("xxxx", null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks string larger than max", () => {
		const maxFn = max<any>(5);
		const res = maxFn("xxxxxxxx", null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks string equal to max", () => {
		const maxFn = max<any>(5);
		const res = maxFn("xxxxx", null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks array smaller than max", () => {
		const maxFn = max<any>(5);
		const res = maxFn([1, 2, 3, 4], null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks array larger than max", () => {
		const maxFn = max<any>(5);
		const res = maxFn([1, 2, 3, 4, 5, 6, 7], null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks array equal to max", () => {
		const maxFn = max<any>(5);
		const res = maxFn([1, 2, 3, 4, 5], null, null);

		expect(res.status).toBeTrue();
	});
});

describe("Tests checking validation method [range]", () => {
	// Numbers
	it("Checks number smaller than range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn(1, null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks number larger than range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn(6, null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks number equal to min range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn(2, null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks number equal to max range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn(5, null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks number within range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn(4, null, null);

		expect(res.status).toBeTrue();
	});

	// String

	it("Checks string smaller than range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn("x", null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks string larger than range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn("xxxxxx", null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks string equal to min range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn("xx", null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks string equal to max range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn("xxxxx", null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks string within range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn("xxxx", null, null);

		expect(res.status).toBeTrue();
	});

	// Arrays

	it("Checks array smaller than range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn([1], null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks array larger than range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn([1, 2, 3, 4, 5, 6], null, null);

		expect(res.status).toBeFalse();
	});

	it("Checks array equal to min range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn([1, 2], null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks array equal to max range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn([1, 2, 3, 4, 5], null, null);

		expect(res.status).toBeTrue();
	});

	it("Checks array within range", () => {
		const rangeFn = range<any>(2, 5);
		const res = rangeFn([1, 2, 3, 4], null, null);

		expect(res.status).toBeTrue();
	});
});

describe("Tests checking validation method [equal]", () => {
	it("Checks two equal numbers", () => {
		const fnObj = equal<any>(2);
		const result = fnObj(2, null, null);
		expect(result.status).toBeTrue();
	});

	it("Checks two different numbers", () => {
		const fnObj = equal<any>(2);
		const result = fnObj(3, null, null);
		expect(result.status).toBeFalse();
	});

	it("Checks two equal strings", () => {
		const fnObj = equal<any>("x");
		const result = fnObj("x", null, null);
		expect(result.status).toBeTrue();
	});

	it("Checks two different strings", () => {
		const fnObj = equal<any>("x");
		const result = fnObj("xx", null, null);
		expect(result.status).toBeFalse();
	});

	it("Checks two equal booleans", () => {
		const fnObj = equal<any>(true);
		const result = fnObj(true, null, null);
		expect(result.status).toBeTrue();
	});

	it("Checks two different booleans", () => {
		const fnObj = equal<any>(true);
		const result = fnObj(false, null, null);
		expect(result.status).toBeFalse();
	});

	it("Checks two different arrays", () => {
		const fnObj = equal<any>([1, 2]);
		const result = fnObj([1, 2, 3], null, null);
		expect(result.status).toBeFalse();
	});
});

describe("Tests checking validation method [ofType]", () => {
	it("Returns true when type matches", () => {
		const fnObj = ofType<any>("string");
		const result = fnObj("XX", null, null);
		expect(result.status).toBeTrue();
	});

	it("Returns false when type does not match", () => {
		const fnObj = ofType<any>("boolean");
		const result = fnObj("XX", null, null);
		expect(result.status).toBeFalse();
	});
});

describe("Tests checking validation method [match]", () => {
	it("Matches string to string", () => {
		const fnObj = match<any>("xx");
		const result = fnObj("xx", null, null);

		expect(result.status).toBeTrue();
	});

	it("Does not match string to string", () => {
		const fnObj = match<any>("xxxx");
		const result = fnObj("xx", null, null);

		expect(result.status).toBeFalse();
	});

	it("Matches boolean to string", () => {
		const fnObj = match<any>("true");
		const result = fnObj(true, null, null);

		expect(result.status).toBeTrue();
	});

	it("Does not match boolean to string", () => {
		const fnObj = match<any>("true");
		const result = fnObj(false, null, null);

		expect(result.status).toBeFalse();
	});

	it("Matches Regex to string", () => {
		const fnObj = match<any>(/x+y$/);
		const result = fnObj("xxy", null, null);

		expect(result.status).toBeTrue();
	});

	it("Does not match Regex to string", () => {
		const fnObj = match<any>(/x+y$/);
		const result = fnObj("xx", null, null);

		expect(result.status).toBeFalse();
	});

	it("Matches Regex to boolean", () => {
		const fnObj = match<any>(/t..e$/);
		const result = fnObj(true, null, null);

		expect(result.status).toBeTrue();
	});

	it("Does not match Regex to boolean", () => {
		const fnObj = match<any>(/t..e$/);
		const result = fnObj(false, null, null);

		expect(result.status).toBeFalse();
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
		const result = fnObj("name", "name", testObject);

		expect(result.status).toBeTrue();
	});

	it("Compares two fields with different values", () => {
		const fnObj = compare<any>("lastname");
		const result = fnObj("name", "name", testObject);

		expect(result.status).toBeFalse();
	});

	it("Compares two fields with different values where comparable does not exist", () => {
		const fnObj = compare<any>("xxx");
		const result = fnObj("name", "name", testObject);

		expect(result.status).toBeFalse();
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

		expect(result.length === 0).toBeTrue();
	});

	it("Returns false when at least one callback fails", () => {
		const validationCallbacks = [min(2), match("xxy")];
		const result = validateSingleValue<any>(
			"prop",
			"xxxx",
			null,
			validationCallbacks
		);

		expect(result.length === 0).toBeFalse();
	});

	it("Breaks at first error", () => {
		const validationCallbacks = [ofType("number"), min(2), match("xxy")];
		const result = validateSingleValue<any>(
			"prop",
			"xxxx",
			null,
			validationCallbacks
		);

		expect(result.length === 1).toBeTrue();
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

		expect(result.length > 1).toBeTrue();
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
		expect(result.errors["name"].length).toEqual(1);
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
	});
});

describe("Tests checking field builder", () => {
	it("It creates files schema field from callbacks", () => {
		const sField = field<any>("x").set(ofType("string"), min(5));
		const built = sField.build();
		expect(built.name).toEqual("x");
		expect(built.callbacks.length).toEqual(2);
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

		expect(built.y).toBeDefined();
		expect(built.y.length).toEqual(2);
	});

	it("Creates schema from provided fields via method [define]", () => {
		const sCh = schema<any>().define(
			field("x").set(ofType("string"), min(5)),
			field("y").set(match("xx"), range(2, 5))
		);

		const built = sCh.build();

		expect(built.x).toBeDefined();
		expect(built.x.length).toEqual(2);

		expect(built.y).toBeDefined();
		expect(built.y.length).toEqual(2);
	});

	it("Creates schema from provided fields via method [set]", () => {
		const sCh = schema<any>()
			.set("x", ofType("string"), min(5))
			.set("y", match("xx"), range(2, 5));

		const built = sCh.build();

		expect(built.x).toBeDefined();
		expect(built.x.length).toEqual(2);

		expect(built.y).toBeDefined();
		expect(built.y.length).toEqual(2);
	});
});
