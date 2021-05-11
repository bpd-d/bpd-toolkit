(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["collection"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "where": () => (/* binding */ where),
/* harmony export */   "findFirst": () => (/* binding */ findFirst),
/* harmony export */   "makeArray": () => (/* binding */ makeArray),
/* harmony export */   "all": () => (/* binding */ all)
/* harmony export */ });
/**
 * Returns all items that pass the condition or undefined if collection is empty or callback is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Items from collection that pass the condition or undefined
 */
function where(collection, whereFn) {
    let count = collection ? collection.length : -1;
    if (count < 1 || !whereFn) {
        return undefined;
    }
    return collection.reduce((out, item, idx) => {
        if (whereFn(item, idx, collection)) {
            out.push(item);
        }
        return out;
    }, []);
}
/**
 * Returns first item and it's index in the collection that passes the condition
 * or undefined if collection is empty or condition is not provided
 * @param collection - collection of items
 * @param condition - condition callback
 * @returns Matching item or undefined
 */
function findFirst(collection, condition) {
    let count = collection ? collection.length : -1;
    if (count < 1 || !condition) {
        return undefined;
    }
    let idx = collection.findIndex(condition);
    if (idx < 0) {
        return undefined;
    }
    return [collection[idx], idx];
}
/**
 * Handy when argument can be either single element or an array.
 * @param t single element or array of the elements
 * @param copy? Set to true if array argument shall be copied
 * @returns array of the elements
 */
function makeArray(t, copy) {
    if (!t) {
        return [];
    }
    if (Array.isArray(t)) {
        return copy === true ? t : [...t];
    }
    return [t];
}
/**
 * Return whether all collection elements pass condition
 * @param array
 * @param condition
 */
function all(array, condition) {
    return array && array.length > 0 && array.find((t) => !condition(t)) === undefined;
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.collection.js.map