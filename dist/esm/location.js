export class LocationError extends Error {
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
export default function getLocation(options) {
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
