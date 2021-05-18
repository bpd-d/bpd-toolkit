import ValidationPattern, {
	digit,
	all,
	positiveLookahead,
	word,
	atLeastOne,
	lowerLetters,
	oneOf,
} from "../src/expressions";

describe("Tests checking class [ValidationPattern], initialization", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
	});

	it("Creates empty pattern after empty initialization", () => {
		const result = pattern.toString();
		expect(result).toEqual("");
	});
});

describe("Tests checking class [ValidationPattern], method [expr] that passes expression to list", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		// We'll create expression that checks wheather string matches email patter
		pattern.expr(
			positiveLookahead(
				all(
					atLeastOne(word),
					"@",
					atLeastOne(word),
					"\\.",
					atLeastOne(word)
				)
			)
		);
	});

	it("Complex expression - match", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "aaa@bbb.ccc".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Complex expression - don't match", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "aaa@@bbb.ccc".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});

	it("Function [expr] adds an expression", () => {
		pattern = new ValidationPattern();
		pattern.expr(digit, "+");

		const result = pattern.toString();
		expect(result).toEqual(`\\d+`);
	});
});

describe("Test checking [ValidationPattern], method [check] that build lookahead with provided expression", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		// pattern that checks whether all characters all lower case letters a-z
		pattern.check(all(atLeastOne(oneOf(lowerLetters))));
	});

	it("Expression - match", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "asdasdas".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Expression - don't match", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "dddSsd3sd".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [ofLength] that checks if string length matches requirements", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
	});

	it("Min - exact", () => {
		pattern.ofLength(2);
		const regExp = pattern.toExpression();

		const resultMatch2 = "22".match(regExp);

		expect(resultMatch2 !== null).toBeTrue();
	});

	it("Min - too short", () => {
		pattern.ofLength(2);
		const regExp = pattern.toExpression();

		const resultNotMatch = "1".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});

	it("Min - longer", () => {
		pattern.ofLength(2);
		const regExp = pattern.toExpression();

		const resultMatch3 = "222".match(regExp);

		expect(resultMatch3 !== null).toBeTrue();
	});

	it("Range - within", () => {
		pattern.ofLength(2, 4);
		const regExp = pattern.toExpression();

		const resultMatch2 = "22".match(regExp);
		const resultMatch3 = "333".match(regExp);
		const resultMatch4 = "4444".match(regExp);

		expect(resultMatch2 !== null).toBeTrue();
		expect(resultMatch3 !== null).toBeTrue();
		expect(resultMatch4 !== null).toBeTrue();
	});

	it("Range - too short", () => {
		pattern.ofLength(2, 4);
		const regExp = pattern.toExpression();

		const resultNotMatch = "1".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});

	it("Range - too long", () => {
		pattern.ofLength(2, 4);
		const regExp = pattern.toExpression();

		const resultNotMatch5 = "55555".match(regExp);

		expect(resultNotMatch5 !== null).toBeFalse();
	});

	it("Exact length - match", () => {
		pattern.ofLength(2, 2);
		const regExp = pattern.toExpression();

		const resultMatch = "22".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Exact length - too long", () => {
		pattern.ofLength(2, 2);
		const regExp = pattern.toExpression();

		const resultMatch = "333".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Exact length - too short", () => {
		pattern.ofLength(2, 2);
		const regExp = pattern.toExpression();

		const resultNotMatch = "1".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [withCapital] that checks if string contains lower cased characters", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.withCapital(2);
	});

	it("Don't match if string does not contain characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "aaaa".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Don't match if string does not contain too many characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "AAAA".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Match if string does contains allowed number characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch1 = "aaAa".match(regExp);
		const resultMatch2 = "aAaA".match(regExp);

		expect(resultMatch1 !== null).toBeTrue();
		expect(resultMatch2 !== null).toBeTrue();
	});
});

describe("Test checking [ValidationPattern], method [withLower] that checks if string contains lower cased characters", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.withLower(2);
	});

	it("Don't match if string does not contain characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "AAAA".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Don't match if string does not contain too many characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "aaaa".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Match if string does contains allowed number characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch1 = "AAAa".match(regExp);
		const resultMatch2 = "aAaA".match(regExp);

		expect(resultMatch1 !== null).toBeTrue();
		expect(resultMatch2 !== null).toBeTrue();
	});
});

describe("Test checking [ValidationPattern], method [withWhitespace] that checks if string contains whitespace characters", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.withWhitespace(2);
	});

	it("Don't match if string does not contain whitespace", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "Aaaa".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Don't match if string contain more whitespaces than allowed", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "Aa  a a".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Match if string does contains allowed number of whitespaces", () => {
		const regExp = pattern.toExpression();

		const resultMatch1 = "A AAa".match(regExp);
		const resultMatch2 = "a Aa A".match(regExp);

		expect(resultMatch1 !== null).toBeTrue();
		expect(resultMatch2 !== null).toBeTrue();
	});
});

describe("Test checking [ValidationPattern], method [withAnyOf] that checks if string contains any of characters", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.withAnyOf();
	});

	it("Don't match if string does not contain characters", () => {
		const regExp = pattern.toExpression();
		const resultMatch = "Aaaa".match(regExp);

		expect(resultMatch !== null).toBeFalse();
	});

	it("Match if string contains one of the characters", () => {
		const regExp = pattern.toExpression();

		const resultMatch1 = "a@aA".match(regExp);
		const resultMatch2 = "A%AAA".match(regExp);
		const resultMatch3 = "A$AAA".match(regExp);
		const resultMatch4 = "A!AAA".match(regExp);
		const resultMatch5 = "A^AAA".match(regExp);

		expect(resultMatch1 !== null).toBeTrue();
		expect(resultMatch2 !== null).toBeTrue();
		expect(resultMatch3 !== null).toBeTrue();
		expect(resultMatch4 !== null).toBeTrue();
		expect(resultMatch5 !== null).toBeTrue();
	});
});

describe("Test checking [ValidationPattern], method [withNoneOf] that checks if string does not contain characters", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.withNoneOf("@%");
	});

	it("Match if string does not contain characters", () => {
		const regExp = pattern.toExpression();
		console.log(pattern.toString());
		const resultMatch = "Aaaa".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Don't match if string does contains one of the characters", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch1 = "a@aA".match(regExp);
		const resultNotMatch2 = "A%AAA".match(regExp);

		expect(resultNotMatch1 !== null).toBeFalse();
		expect(resultNotMatch2 !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [withDigits] that checks if string contains digits", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.withDigits(2);
	});

	it("Match if string contains allowed number", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "aasa2".match(regExp);
		const resultMatch2 = "aa3sa2".match(regExp);

		expect(resultMatch !== null).toBeTrue();
		expect(resultMatch2 !== null).toBeTrue();
	});

	it("Don't match if string does not contain any digit", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "asaA".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});

	it("Don't match if string contains too many digits", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "as2s2aA4".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [noWhitespace] that checks if string does not contain any whitespace", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.noWhitespace();
	});

	it("Match if string does not contain any whitespace", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "aasa2".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Don't match if string does contain any whitespace", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "a saA".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [digitsOnly] that checks if string contains digits only", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.digitsOnly();
	});

	it("Match if string contains only digits", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "2355123".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Don't match if string contains anything else than digits", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "2323ssas2".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [wordOnly] that checks if string contains word characters only", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.wordOnly();
	});

	it("Match if string contains only word", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "asA235512_".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Don't match if string contains anything else than word", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "assAS2#2_".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});

describe("Test checking [ValidationPattern], method [noDigits] that checks if string contains word characters only", () => {
	let pattern: ValidationPattern;

	beforeEach(() => {
		pattern = new ValidationPattern();
		pattern.noDigits();
	});

	it("Match if string does not contain digits", () => {
		const regExp = pattern.toExpression();

		const resultMatch = "asdAdsdS@ss#".match(regExp);

		expect(resultMatch !== null).toBeTrue();
	});

	it("Don't match if string contains any digit", () => {
		const regExp = pattern.toExpression();

		const resultNotMatch = "assAS2#2_".match(regExp);

		expect(resultNotMatch !== null).toBeFalse();
	});
});
