/**
 * Methods implementation borrowed from W3School color converter implementation
 */
/**
 * Converters
 */
/**
 * Converts hex color string to RGB color object
 * @param hex string w/o # character
 * @returns RGB color
 */
export function hexToRgb(hex) {
    let start = hex.includes('#') ? 1 : 0;
    const rgbArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        rgbArray[i] = fromHex(hex.substr(start + i * 2, 2));
    }
    return validateRgb({
        red: rgbArray[0],
        green: rgbArray[1],
        blue: rgbArray[2]
    });
}
/**
 * Converts HSL color scheme to RGB color sheme
 * @param hslColor
 * @returns RGB color object
 */
export function hslToRgb(hslColor) {
    if (!validateHsl(hslColor)) {
        return undefined;
    }
    let t2;
    const sat = hslColor.saturation;
    const light = hslColor.lightness;
    const hue = hslColor.hue / 60;
    if (light <= 0.5) {
        t2 = light * (sat + 1);
    }
    else {
        t2 = light + sat - (light * sat);
    }
    const t1 = light * 2 - t2;
    return validateRgb({
        red: Math.round(hueToRgb(t1, t2, hue + 2) * 255),
        green: Math.round(hueToRgb(t1, t2, hue) * 255),
        blue: Math.round(hueToRgb(t1, t2, hue - 2) * 255)
    });
}
/**
 * Converts RGB color to HSL color
 * @param rgbColor RGB color
 * @returns HSL color object
 */
export function rgbToHsl(rgbColor) {
    if (!validateRgb(rgbColor)) {
        return undefined;
    }
    let maxcolor = 0;
    const rgb = new Array(rgbColor.red / 255, rgbColor.green / 255, rgbColor.blue / 255);
    let min = rgb[0];
    let max = rgb[0];
    for (let i = 0; i < 2; i++) {
        let nextIdx = i + 1;
        if (rgb[nextIdx] <= min) {
            min = rgb[nextIdx];
        }
        if (rgb[nextIdx] >= max) {
            max = rgb[nextIdx];
            maxcolor = nextIdx;
        }
    }
    const hue = getHue(rgb, min, max, maxcolor);
    const light = (min + max) / 2;
    const saturation = getSaturation(min, max, light);
    return validateHsl({
        hue: Math.round(hue),
        saturation: Math.round(saturation * 100) / 100,
        lightness: Math.round(light * 100) / 100
    });
}
/**
 * Helpers
*/
function validateRgb(rgbColor) {
    if (between0and255(rgbColor.red) && between0and255(rgbColor.green) && between0and255(rgbColor.blue)) {
        return rgbColor;
    }
    return undefined;
}
function validateHsl(hslColor) {
    if (between(hslColor.hue, 0, 360) &&
        between(hslColor.saturation, 0, 1) &&
        between(hslColor.lightness, 0, 1)) {
        return hslColor;
    }
    return undefined;
}
function between(value, min, max) {
    return value >= min && value <= max;
}
function between0and255(value) {
    return between(value, 0, 255);
}
function getHue(rgbArray, min, max, colorIndex) {
    if (colorIndex > 2 || colorIndex < 0) {
        throw new Error("Incorrect color index");
    }
    let callbacks = new Array(getHueOnRed, getHueOnGreen, getHueOnBlue);
    let hue = callbacks[colorIndex](rgbArray, min, max);
    if (isNaN(hue)) {
        return 0;
    }
    hue = hue * 60;
    if (hue < 0) {
        return hue + 360;
    }
    return hue;
}
function getHueOnRed(rgbArray, min, max) {
    return (rgbArray[1] - rgbArray[2]) / (max - min);
}
function getHueOnGreen(rgbArray, min, max) {
    return 2 + (rgbArray[2] - rgbArray[0]) / (max - min);
}
function getHueOnBlue(rgbArray, min, max) {
    return 4 + (rgbArray[0] - rgbArray[1]) / (max - min);
}
/**
 * Helper for rgbToHsl function which calculates saturation
 * @param min minimal color value
 * @param max
 * @param lightness
 */
function getSaturation(min, max, lightness) {
    if (min == max) {
        return 0;
    }
    if (lightness < 0.5) {
        return (max - min) / (max + min);
    }
    return (max - min) / (2 - max - min);
}
/**
 * Helper for "hslToRgb" to calculate color value
 * @param t1
 * @param t2
 * @param hue
 * @returns color value 0 - 255
 */
function hueToRgb(t1, t2, hue) {
    if (hue < 0)
        hue += 6;
    if (hue >= 6)
        hue -= 6;
    if (hue < 1)
        return (t2 - t1) * hue + t1;
    else if (hue < 3)
        return t2;
    else if (hue < 4)
        return (t2 - t1) * (4 - hue) + t1;
    else
        return t1;
}
/**
 * Converts numeric value to hex string
 * @param value numeric value
 * @returns hex string
 */
export function toHex(value) {
    let hex = value.toString(16);
    while (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}
/**
 * Converts hex string to numeric value;
 * @param hex
 * @returns
 */
export function fromHex(hex) {
    return parseInt(hex, 16);
}
/**
 * To notation
 */
/**
 * Creates HSL string from object hsl(x, y%, z%)
 * @param hslColor color object
 * @returns HSL string
 */
export function toHslString(hslColor) {
    return `hsl(${hslColor.hue},${hslColor.saturation * 100}%,${hslColor.lightness * 100}%)`;
}
/**
 * Creates RGB string from object rgb(x, y, z)
 * @param rgbColor color object
 * @returns RGB string
 */
export function toRgbString(rgbColor) {
    return `rgb(${rgbColor.red},${rgbColor.green},${rgbColor.blue})`;
}
/**
 * Creates RGBa string from object rgba(x, y, z, a)
 * @param rgbaColor color object
 * @returns RGBa string
 */
export function toRgbaString(rgbaColor) {
    return `rgba(${rgbaColor.red},${rgbaColor.green},${rgbaColor.blue},${rgbaColor.alpha})`;
}
/**
 * Creates HEX string from rgb object #XXYYZZ
 * @param rgbColor color object
 * @returns HEx string
 */
export function toHexString(rgbColor) {
    return `#${toHex(rgbColor.red)}${toHex(rgbColor.green)}${toHex(rgbColor.blue)}`;
}
/**
 * Creates HEXa string from rgb object #XXYYZZAA
 * @param rgbaColor color object
 * @returns HEXa string
 */
export function toHexaString(rgbaColor) {
    return toHexString(rgbaColor) + toHex(rgbaColor.alpha * 255);
}
