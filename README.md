# bpd-toolkit

Set of handy functions and shorthands

## Functions:

-   isUndefined - (value) - check whether value is **undefined**
-   isNull - (value) - check whether value is **null**
-   is - (value, [typecheck = true]) - check whether value is not null or undefined. By default it also calls method **isEmpty**
-   isEmpty - (value) - if value is string then if it is not empty; if it is Array then if it is not an empty array; if boolean then returns value
-   are - (...values) - performs **is** on each value. Returns false when at least one is falsy
-   sleep - (timeout) - promisified version of setTimeout
-   clone - Clones an object
-   getRangeValue - (value, min, max) - Gets value from range
-   isInRange - (value, min, max) - Checks if value is in range
-   createElementFromString - (htmlString) - creates an element from string
-   parseJsonString - (attribute) - parses JSON string to object
-   counter - generator which gives next number starting from 0 to 200000. After reaching max value it starts from 0 again.
-   enumerateObject - (object, callback: (property, value)) - iterates through an object and calls callback for each property.
-   reduceObject - (object, callback: (result, property, value, index), initial) - perform reduce but on object. Enumerates through object and invokes callback for each property
-   hasFunction - checks whether object has porperty and this property is an function
-   hasProperty - checks whether object has porperty
-   insert - (collection, index, ...items) - Inserts new item to the collection at specific index
-   move - (collection, from, to, size?) - Moves element or number of elements starting from index to new index
-   openFullscreen - (element) - Opens element in fullscreen if possible
-   closeFullscreen - Closes fullscreen if possible
-   promisify - (callback) - Creates function that once invoked returns a promise that executes original callback

## Location

-   getLocation - (options) - Promisified function that obtains geolocation coordinates

## Collection

-   where - (collection, condition) - Returns all items that pass the condition or undefined if collection is empty or callback is not provided
-   findFirst - (collection, condition) - Returns first item and it's index in the collection that passes the condition
-   all - (collection, condition) - Returns all items matching to condition

## Specials

-   debounce - (callback, delay) - creates new, debounced function which delays callback execution by specific time. However if called again before current timeout finishes, current is cancelled and new timeout is created. Returns cancellation function. Useful in search boxes.
-   Debounce - similar to above, but exposes two functions to achieve the same effect. To call a callback invoke method **call** with callback arguments. To cancel current execution, invoke method **cancel**

```javascript
let debounce = new Debounce(callback, timeout);
debounce.call(...args);
debounce.cancel();
```

-   throttle - (callback, delay) - invokes callback and then block next executions by specific time or until is cancelled. Returns cancellation function. Useful to block mulitple calls performed in short period of time
-   Throttle - similar to Debounce class. Provides two methods: call and cancel. Call accepts the same arguments like original callback as they are passed to callback in the time of execution.

```javascript
let throttle = new Throttle(callback, throttleTime);
throttle.call(...args);
throttle.cancel();
```

-   delay - (callback, delay) - delay callback execution by specific time. Return cancellation function.
-   Keeper - (limit) - class which helps with managing object changes.

```javascript
let keeper = new Keeper(4);
keeper.push(obj);
keeper.undo(current);
keeper.redo();
```

## Task

Handles async operations using promises. It behaves like a factory - callback passed during initialization is converted to promise on every **call**. Task respects argument passed during call, if there is an execution pending with the same argument promised is reused.
Usage:

```javascript
const task = new Task<T,V>(callback, timeout?);
const result = await task.call(arg);
```

where:

-   T - argument type
-   V - returned type
-   callback - callback to execute
-   timeout - optional - if set then each execution gets delayed by this value

## Switch

**smartSwitch** is used to evaluate value based on input argument and list of condition callbacks passed in options.
Condition is a callback that returns value, promise or function (which returns value at the end) - if callback returns undefined it means condition did not pass.

Options:

-   conditions - list of condition callbacks
-   multi - conditions check loop goes to the end instead breaking on first match
-   default - default value returned when no condition passed

## Queue

---

## Colors converters

-   hexToRgb - (string) - converts string w/o or with # to RGB color
-   hslToRgb - (hsl) - converts hsl color to rgb color
-   rgbToHsl - (rgb) - converts rgb color to hsl
-   toHslString - (hsl) - returns string hsl(...)
-   toRgbString - (rgb) - returns string rgb(...)
-   toRgbaString - (rgba) - returns string rgba(...)
-   toHexString - (rgb) - returns string #...
-   toHexaString - (rgba) - returns string #...

## Validator

Simplifies object validation. It accepts schema that holds fields with set of rules for them. Passed object is checked agains this schema

### validate

Method performs a validation. It finishes once first error is found (if proper option is not set).
`validate(object, schema, options?)`
Returns validation result which return overall result, errors details (if any occured) and data (if no error) - but this is not an input data.
Field `data` contains only fields which were included in schema

Options

-   checkAll - if set then validator performs validation of all fields

### field

Builder that creates validation for single field

```
field(name).set(validationCallback)
```

### schema

Function that creates a schema builder. It allows to create schema in three different ways.

-   **structure** - passed in constructor. This shall be a plain object:

```
schema<any>({
	x: {
		type: "string",
		min: 5,
	},
	y: {
		match: "xx",
		range: [2, 5],
	},
});
```

-   **set(name, ...validationCallbacks)**
    Manual definition of field

```
schema<any>().set("xxx", min(5), ofType("string"));
```

-   **define(fields)**
    Accepts list of field builders

```
schema<any>().define(
    field("xxx").set(min(5), ofType("string"))
)
```

### Validation callbacks

Library provides some validation callback, however custom can be defined.
Validation callback must implement following interface:

```
interface ValidationCallback {
	name: string;
	failMessage: string;
	callback: (obj: any) => boolean;
}
```

Example

```
function customValidator(...args) {
    return {
        name: "myCustomMethod",
        failMessage: "Validation of this custom message failed",
        callback: (input: any) {
            if(!//your condition) {
                return false;
            }
            return true;
        }
    }
}
```

Library provides following list of validation methods:

-   `min(minVal: number, message?: string)` - minimum length or value of the object - for number compares value, arrays and string length, otherwise is tries to covert value to number Optionally custom fail message.

-   `max(minVal: number, message?: string)` - maximum length or value of the object - for number compares value, arrays and string length, otherwise is tries to covert value to number. Optionally custom fail message.

-   `range(minVal: number, maxVal: number, ,message?: string)` - range between min and max length or value of the object - for number compares value, arrays and string length, otherwise is tries to covert value to number. Optionally custom fail message.

-   `match(compare: string | RegExp, message?: string)` - performs match for strings, otherwise it calls **toString** then **match**. Optionally custom fail message.

-   `equal(compare: any, message?: string)` - Check if value equals to **compare**. Performs **Object.is**. Optionally custom fail message.

-   `ofType(typeString: string, message?: string)` - Check value agains **typeof** with given type string. Optionally custom fail message.

## Expressions

### matches

Simple helper function that performs match on the given string value.
What makes this function special is that it calculates performance.
Returns match result:

-   `result` - {boolean} - match was found or not
-   `input` - {string} - input string
-   `error` - {Error | string} - (optional) - filled when error is throw during execution
-   `origin` - {RegExpMatchArray | null} - match result
-   `time` - {number} - execution time
-   `pattern` - {RegExp | string | null} - regex pattern

Example

```
const input = "someValue"
const expression = new RegExp(^\w+$);

const result = matches(input, epxression);

if(!result.result) {
    // Handle when no match found
}
```

### ValidationPattern

Creates an instance of builder that constructs an expression to validate strings.
Class uses positive lookahead for each option.

-   `expr(...expressions: string[])` - adds expressions to list
-   `check(expression: string)` - Adds expression that validates whether string passes some condition
-   `ofLength(min: number, max?: number)` - Adds expression that validates length of the string. Max is optional - in that case only min is checked
-   `withCapital(count?: number)` - Adds expression that validates whether string contains capital letters. Optionally how many occurences can be.
-   `withLower(count?: number)` - Adds expression that validates whether string contains lower cased letters. Optionally how many occurences can be.
-   `withWhitespace(count?: number)` - Adds expression that validates whether string contains whitespaces. Optionally how many occurences can be.
-   `withAnyOf(characters?: string)` - Adds expression that validates whether string contain any of the characters. If characters are not provided then **specialCharacters** are set
-   `withNoneOf(characters: string)` - Adds expression that validates whether string does not contain characters.
-   `withDigits(count?: number)` - Adds expression that validates whether string contains digits
-   `noWhitespace()` - Adds expression that validates whether string does not contain whitespaces
-   `digitsOnly()` - Adds expression that validates whether string contains only digits
-   `wordOnly()` - Adds expression that validates if string contains word only characters (a-zA-Z0-9\_)
-   `noDigits()` - Adds expression that validates if string does not contain any digit
-   `toExpression(flags?: string)` - creates instance of **RegExp**.

## Constants

-   `capitalLetters` - "A-Z";
-   `lowerLetters` - "a-z";
-   `digit` - "\\d";
-   `notDigit` - "\\D";
-   `whitespace` - "\\s";
-   `notWhitespace` - "\\S";
-   `word` - "\\w";
-   `notWord` - "\\W";
-   `any` - ".";
-   `specialCharacters` - "\\!\\\*\\\_\\?\\+\\-\\^\\$-@%#&";

## Functions

-   `noneOrOne(...value: string[])` - Creates pattern `value?`
-   `noneOrMore(...value: string[])` - Creates pattern `value*`
-   `atLeastOne(...value: string[])` - Creates pattern `value+`
-   `range(min: number, max?: number)` - Creates range pattern {min, max} or {min}
-   `negativeLookahead(...value: string[])` - Creates pattern `(?!value)`
-   `positiveLookahead(...value: string[])` - Creates pattern `(?=value)`
-   `notOneOf(...value: string[])` - Creates pattern `[^value]`
-   `oneOf(...value: string[])` - Creates pattern `[value]`
-   `or(...value: string[])` - Creates pattern `value|value|value...`
-   `group(...value: string[])` - Creates pattern `(value)`
-   `all(...value: string[])` - Creates pattern `^value$`
