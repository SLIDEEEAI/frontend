import { type RGBcolor } from '@/types/Presentation';

export function useColor() {

    function hexToRgb(hex : string) : RGBcolor {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // return result ? {
        //   r: parseInt(result[1], 16),
        //   g: parseInt(result[2], 16),
        //   b: parseInt(result[3], 16)
        // } : null;

        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
         ] : [0,0,0];
    }

    function componentToHex(c : number) {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(rgb : [number,number,number]) {
        return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
    }


    return {
        hexToRgb,
        rgbToHex,
        componentToHex
    }
}