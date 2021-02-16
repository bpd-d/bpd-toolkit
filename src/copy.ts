export async function copyTextOld(value: string): Promise<string | null> {
    let textArea = document.createElement("textarea");
    let result: string | null = null;
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
    } catch (err) {
        result = null;
    }
    document.body.removeChild(textArea);
    return result;
}


export async function copyTextNew(value: string): Promise<string | null> {
    let result = null;
    try {
        await navigator.clipboard.writeText(value)
        result = value;
    } catch (err) {
        result = null;
    }
    return result;
}

export async function copyText(value: string): Promise<string | null> {
    if (!value) {
        return null;
    }
    return window.navigator && window.navigator.clipboard ? copyTextNew(value) : copyTextOld(value);
}