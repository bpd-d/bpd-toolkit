(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["copy"] = factory();
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
/* harmony export */   "copyTextOld": () => (/* binding */ copyTextOld),
/* harmony export */   "copyTextNew": () => (/* binding */ copyTextNew),
/* harmony export */   "default": () => (/* binding */ copyText)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function copyTextOld(value) {
    return __awaiter(this, void 0, void 0, function* () {
        let textArea = document.createElement("textarea");
        let result = null;
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = "0";
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            let successful = document.execCommand('copy');
            result = value;
        }
        catch (err) {
            result = null;
        }
        document.body.removeChild(textArea);
        return result;
    });
}
function copyTextNew(value) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = null;
        try {
            yield navigator.clipboard.writeText(value);
            result = value;
        }
        catch (err) {
            result = null;
        }
        return result;
    });
}
function copyText(value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!value) {
            return null;
        }
        return window.navigator && window.navigator.clipboard ? copyTextNew(value) : copyTextOld(value);
    });
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.copy.js.map