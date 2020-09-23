# bpd-toolkit
Set of handy functions and shorthands

Functions:
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
* hasFunction - checks whether object has porperty and this property is an function
* hasProperty - checks whether object has porperty