# bpd-toolkit
Set of handy functions and shorthands

## Functions:
* isUndefined - (value) - check whether value is **undefined**
* isNull - (value) - check whether value is **null**
* is - (value, [typecheck = true]) - check whether value is not null or undefined. By default it also calls method **isEmpty**
* isEmpty - (value) -  if value is string then if it is not empty; if it is Array then if it is not an empty array; if boolean then returns value
* are - (...values) - performs **is** on each value. Returns false when at least one is falsy
* sleep - (timeout) - promisified version of setTimeout
* clone - Clones an object
* getRangeValue - (value, min, max) - Gets value from range
* isInRange - (value, min, max) - Checks if value is in range
* createElementFromString - (htmlString) - creates an element from string
* parseJsonString - (attribute) - parses JSON string to object
* counter - generator which gives next number starting from 0 to 200000. After reaching max value it starts from 0 again.
* enumerateObject - (object, callback: (property, value)) - iterates through an object and calls callback for each property.
* reduceObject - (object, callback: (result, property, value, index), initial) - perform reduce but on object. Enumerates through object and invokes callback for each property
* hasFunction - checks whether object has porperty and this property is an function
* hasProperty - checks whether object has porperty
* insert - (collection, index, ...items) - Inserts new item to the collection at specific index
* move - (collection, from, to, size?) -  Moves element or number of elements starting from index to new index
* openFullscreen - (element) - Opens element in fullscreen if possible 
* closeFullscreen - Closes fullscreen if possible
* promisify - (callback) - Creates function that once invoked returns a promise that executes original callback

## Location
* getLocation - (options) - Promisified function that obtains geolocation coordinates

## Collection
* where - (collection, condition) - Returns all items that pass the condition or undefined if collection is empty or callback is not provided
* findFirst - (collection, condition) - Returns first item and it's index in the collection that passes the condition 
* all - (collection, condition) - Returns all items matching to condition

## Specials
* debounce - (callback, delay) - creates new, debounced function which delays callback execution by specific time. However if called again before current timeout finishes, current is cancelled and new timeout is created. Returns cancellation function. Useful in search boxes.
* Debounce - similar to above, but exposes two functions to achieve the same effect. To call a callback invoke method **call** with callback arguments. To cancel current execution, invoke method **cancel**
```javascript
let debounce = new Debounce(callback, timeout)
debounce.call(...args);
debounce.cancel();
```
* throttle - (callback, delay) - invokes callback and then block next executions by specific time or until is cancelled. Returns cancellation function. Useful to block mulitple calls performed in short period of time
* Throttle - similar to Debounce class. Provides two methods: call and cancel. Call accepts the same arguments like original callback as they are passed to callback in the time of execution.
```javascript
let throttle = new Throttle(callback, throttleTime)
throttle.call(...args);
throttle.cancel();
```
* delay - (callback, delay) - delay callback execution by specific time. Return cancellation function.
* Keeper - (limit) - class which helps with managing object changes. 
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
* T - argument type
* V - returned type
* callback - callback to execute
* timeout - optional - if set then each execution gets delayed by this value

## Switch

**smartSwitch** is used to evaluate value based on input argument and list of condition callbacks passed in options.
Condition is a callback that returns value, promise or function (which returns value at the end) - if callback returns undefined it means condition did not pass.

Options:
* conditions - list of condition callbacks
* multi - conditions check loop goes to the end instead breaking on first match
* default - default value returned when no condition passed 

## Queue

** **

## Colors converters
* hexToRgb - (string) - converts string w/o or with # to RGB color
* hslToRgb - (hsl) - converts hsl color to rgb color
* rgbToHsl - (rgb) - converts rgb color to hsl
* toHslString - (hsl) - returns string hsl(...)
* toRgbString - (rgb) - returns string rgb(...)
* toRgbaString - (rgba) - returns string rgba(...)
* toHexString - (rgb) - returns string #...
* toHexaString - (rgba) - returns string #...