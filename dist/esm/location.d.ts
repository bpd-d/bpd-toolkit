export interface GeolocationCoordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}
export interface GeolocationPosition {
    readonly coords: GeolocationCoordinates;
    readonly timestamp: number;
}
export interface GeolocationPositionError {
    readonly code: number;
    readonly message: string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}
export declare class LocationError extends Error {
    errorCode: string;
    constructor(code: string, message: string);
}
/**
 * Promisified function that obtains geolocation coordinates or throws an error if it is not possible.
 * Function uses native geolocation API.
 * @param options - PositionOptions (MDN) - position options
 * @returns Promise that resolves with GeolocationPosition object
 */
export default function getLocation(options?: PositionOptions): Promise<GeolocationPosition>;
