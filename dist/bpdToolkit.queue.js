(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpdToolkit", [], factory);
	else if(typeof exports === 'object')
		exports["bpdToolkit"] = factory();
	else
		root["bpdToolkit"] = root["bpdToolkit"] || {}, root["bpdToolkit"]["queue"] = factory();
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
/* harmony export */   "Queue": () => (/* binding */ Queue)
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
/**
 * Provides basic implementation of queue.
 * It perform tasks as single - one by one or in batches - gets all queued tasks at the time.
 * Allows to remove task if it wasn't performed yet
 *
 * Queue gives only a basic logic - task execution is delegated to an adapter
 */
class Queue {
    constructor(adapter, options) {
        this._lock = false;
        this._items = [];
        this._adapter = adapter;
        this._comparer = undefined;
        this._onError = undefined;
        this._errorCount = 0;
        this._options = {
            cleanQueueOnError: false,
            errorLimit: 10
        };
        if (options) {
            this._options = Object.assign(Object.assign({}, this._options), options);
        }
    }
    /**
     * Add item to a queue - it invokes flush right away
     * @param item
     */
    add(item) {
        this._items.push(item);
        if (this._lock) {
            return;
        }
        this._lock = true;
        this.flush().then(() => {
            this._lock = false;
        });
    }
    /**
     * Deletes item from task list
     * @param item
     */
    delete(item) {
        const index = this._items.findIndex(_item => this.compare(_item, item));
        if (index < 0) {
            return undefined;
        }
        return this._items.splice(index, 1)[0];
    }
    /**
     * Indicates whether queue is locked
     */
    isLocked() {
        return this._lock;
    }
    /**
     * Sets custom compare callback for cases where Object.is doesn't work
     * Used for delete
     * @param callback
     */
    setCompareCallback(callback) {
        this._comparer = callback;
    }
    /**
     * Sets callback to catch errors occured during flush execution
     * @param callback
     */
    onError(callback) {
        this._onError = callback;
    }
    compare(item1, item2) {
        if (this._comparer) {
            return this._comparer(item1, item2);
        }
        return Object.is(item1, item2);
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.getItemsForFlush();
            if (items.length === 0) {
                return true;
            }
            try {
                yield this._adapter.onFlush(items);
                this._errorCount = 0;
            }
            catch (e) {
                this._errorCount += 1;
                this.callError(e, items);
                this.cleanQueueOnError();
            }
            return this.flush();
        });
    }
    cleanQueueOnError() {
        if (this._options.cleanQueueOnError && this._options.errorLimit && this._errorCount >= this._options.errorLimit) {
            this._items = [];
            this._errorCount = 0;
            this.callError("Errors limit has been reached: " + this._options.errorLimit, []);
        }
    }
    getItemsForFlush() {
        if (this._adapter.type === 'batch') {
            let result = [...this._items];
            this._items = [];
            return result;
        }
        const item = this._items.shift();
        if (item) {
            return [item];
        }
        return [];
    }
    callError(error, items) {
        if (this._onError) {
            this._onError(error, this._errorCount, items);
        }
    }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bpdToolkit.queue.js.map