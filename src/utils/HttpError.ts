/* 
? Extends the standard Error class to include HTTP response status codes.
? defined in a separate utils modules as it will be used across the application for error handling
*/

class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message); // Call the parent constructor with the message
        this.statusCode = statusCode; // Set the custom property
    }
}

export default HttpError;
