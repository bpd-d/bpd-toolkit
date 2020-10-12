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