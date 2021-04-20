import { hexToRgb, HslColor, hslToRgb, RgbaColor, RgbColor, rgbToHsl, toHexaString, toHexString, toHslString, toRgbaString, toRgbString } from '../src/colors';

describe("Tests checking colors converters", () => {
    it("[hexToRgb] converts string with #", () => {
        // #25acb9 -> rgb(37, 172, 185)
        const colorStr = "#25acb9";
        const result = hexToRgb(colorStr)

        expect(result).toBeDefined();
        expect(result.red).toEqual(37);
        expect(result.green).toEqual(172);
        expect(result.blue).toEqual(185);
    })

    it("[hexToRgb] converts string without #", () => {
        // #25acb9 -> rgb(37, 172, 185)
        const colorStr = "25acb9";
        const result = hexToRgb(colorStr)

        expect(result).toBeDefined();
        expect(result.red).toEqual(37);
        expect(result.green).toEqual(172);
        expect(result.blue).toEqual(185);
    })

    it("[hexToRgb] inproper value", () => {
        const colorStr = "25acgg";
        const result = hexToRgb(colorStr)

        expect(result).toBeUndefined();
    })

    it("[hslToRgb] proper convert", () => {
        //hsl(185, 67%, 44%) -> rgb(37, 175, 187)
        const color: HslColor = { hue: 185, saturation: 0.67, lightness: 0.44 };
        const rgb: RgbColor = hslToRgb(color);

        expect(rgb).toBeDefined();
        expect(rgb.red).toEqual(37);
        expect(rgb.green).toEqual(175);
        expect(rgb.blue).toEqual(187);
    })

    it("[hslToRgb] inproper convert", () => {
        const color: HslColor = { hue: 400, saturation: 67, lightness: 44 };
        const rgb: RgbColor = hslToRgb(color);

        expect(rgb).toBeUndefined();
    })

    it("[rgbToHsl] proper convert", () => {
        // rgb(37, 172, 185) -> hsl(185, 67%, 44%)
        const color: RgbColor = { red: 37, green: 172, blue: 185 };
        const hsl: HslColor = rgbToHsl(color);

        expect(hsl).toBeDefined();
        expect(hsl.hue).toEqual(185);
        expect(hsl.saturation).toEqual(0.67);
        expect(hsl.lightness).toEqual(0.44);
    })

    it("[rgbToHsl] proper convert", () => {
        const color: RgbColor = { red: 300, green: 172, blue: 185 };
        const hsl: HslColor = rgbToHsl(color);

        expect(hsl).toBeUndefined();
    })
})

describe("Tests checking colors to string methods", () => {
    it("[toHslString] prepares string", () => {
        const color: HslColor = { hue: 200, saturation: 0.2, lightness: 0.34 };
        const hslStr = toHslString(color);

        expect(hslStr).toMatch(/hsl\(.*200.*,.*20%.*,.*34%.*\)$/);
    })

    it("[toRgbString] prepares string", () => {
        const color: RgbColor = { red: 200, green: 100, blue: 134 };
        const rgbStr = toRgbString(color);

        expect(rgbStr).toMatch(/rgb\(.*200.*,.*100.*,.*134.*\)$/);
    })

    it("[toRgbaString] prepares string", () => {
        const color: RgbaColor = { red: 200, green: 100, blue: 134, alpha: 0.2 };
        const rgbStr = toRgbaString(color);

        expect(rgbStr).toMatch(/rgba\(.*200.*,.*100.*,.*134.*,.*0\.2.*\)$/);
    })

    it("[toHexString] prepares string", () => {
        const color: RgbColor = { red: 200, green: 100, blue: 134 };
        const rgbStr = toHexString(color);

        expect(rgbStr).toMatch("#c86486");
    })

    it("[toHexaString] prepares string", () => {
        const color: RgbaColor = { red: 200, green: 100, blue: 134, alpha: 0.2 };
        const rgbStr = toHexaString(color);

        expect(rgbStr).toMatch("#c8648633");
    })
})