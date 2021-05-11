(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["location"] = factory();
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
/* harmony export */   "LocationError": () => (/* binding */ LocationError),
/* harmony export */   "default": () => (/* binding */ getLocation)
/* harmony export */ });
class LocationError extends Error {
    constructor(code, message) {
        super(message);
        this.errorCode = code;
        Object.setPrototypeOf(this, LocationError.prototype);
    }
}
/**
 * Promisified function that obtains geolocation coordinates or throws an error if it is not possible.
 * Function uses native geolocation API.
 * @param options - PositionOptions (MDN) - position options
 * @returns Promise that resolves with GeolocationPosition object
 */
function getLocation(options) {
    return new Promise((resolve, reject) => {
        function onLocationAcquire(location) {
            resolve(location);
        }
        function onLocationError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    reject(new LocationError("PERMISSION_DENIED", "Geolocation service denied"));
                    break;
                case error.POSITION_UNAVAILABLE:
                    reject(new LocationError("POSITION_UNAVAILABLE", "Position is unavailable"));
                    break;
                case error.TIMEOUT:
                    reject(new LocationError("TIMEOUT", "Geolocation service has timed out"));
                    break;
                default:
                    reject(new LocationError("UNKNOWN_ERROR", "Geolocation service general error"));
                    break;
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onLocationAcquire, onLocationError, options);
        }
        else {
            reject(new LocationError("API_ERROR", "Location API not available"));
        }
    });
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.location.js.map