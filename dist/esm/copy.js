var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function copyTextOld(value) {
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
export function copyTextNew(value) {
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
export default function copyText(value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!value) {
            return null;
        }
        return window.navigator && window.navigator.clipboard ? copyTextNew(value) : copyTextOld(value);
    });
}
