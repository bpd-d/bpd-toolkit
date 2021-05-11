(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["lock"] = factory();
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
/* harmony export */   "default": () => (/* binding */ getLock)
/* harmony export */ });
class BpdLock {
    constructor(options) {
        var _a;
        this._lock = options.initial === true;
        this._throwErrors = options.throwErrors === true;
        this._name = (_a = options.name) !== null && _a !== void 0 ? _a : "-";
    }
    lock(caller) {
        if (this.isLocked()) {
            this.throwError("lock", caller);
            return false;
        }
        this._lock = true;
        return true;
    }
    unlock(caller) {
        if (!this.isLocked()) {
            this.throwError("unlock", caller);
            return false;
        }
        this._lock = false;
        return true;
    }
    isLocked() {
        return this._lock === true;
    }
    throwError(fn, caller) {
        if (!this._throwErrors) {
            return;
        }
        throw new Error(`[${this._name}] Component ${caller} error on: ${fn}`);
    }
}
function getLock(options) {
    return new BpdLock(options !== null && options !== void 0 ? options : {});
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.lock.js.map