/**
 * Methods implementation borrowed from W3School color converter implementation
 */
/**
 * Interfaces
 */
export interface RgbColor {
    red: number;
    green: number;
    blue: number;
}
export interface RgbaColor extends RgbColor {
    alpha: number;
}
export interface HslColor {
    hue: number;
    saturation: number;
    lightness: number;
}
/**
 * Converters
 */
/**
 * Converts hex color string to RGB color object
 * @param hex string w/o # character
 * @returns RGB color
 */
export declare function hexToRgb(hex: string): RgbColor | undefined;
/**
 * Converts HSL color scheme to RGB color sheme
 * @param hslColor
 * @returns RGB color object
 */
export declare function hslToRgb(hslColor: HslColor): RgbColor | undefined;
/**
 * Converts RGB color to HSL color
 * @param rgbColor RGB color
 * @returns HSL color object
 */
export declare function rgbToHsl(rgbColor: RgbColor): HslColor | undefined;
/**
 * Converts numeric value to hex string
 * @param value numeric value
 * @returns hex string
 */
export declare function toHex(value: number): string;
/**
 * Converts hex string to numeric value;
 * @param hex
 * @returns
 */
export declare function fromHex(hex: string): number;
/**
 * To notation
 */
/**
 * Creates HSL string from object hsl(x, y%, z%)
 * @param hslColor color object
 * @returns HSL string
 */
export declare function toHslString(hslColor: HslColor): string;
/**
 * Creates RGB string from object rgb(x, y, z)
 * @param rgbColor color object
 * @returns RGB string
 */
export declare function toRgbString(rgbColor: RgbColor): string;
/**
 * Creates RGBa string from object rgba(x, y, z, a)
 * @param rgbaColor color object
 * @returns RGBa string
 */
export declare function toRgbaString(rgbaColor: RgbaColor): string;
/**
 * Creates HEX string from rgb object #XXYYZZ
 * @param rgbColor color object
 * @returns HEx string
 */
export declare function toHexString(rgbColor: RgbColor): string;
/**
 * Creates HEXa string from rgb object #XXYYZZAA
 * @param rgbaColor color object
 * @returns HEXa string
 */
export declare function toHexaString(rgbaColor: RgbaColor): string;
