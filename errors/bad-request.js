// CLASS TO SEND CUSTOMIZED BAD REQUESTS CODES( LEAVING OUT REQUIRED VALUES)
import CustomAPIError from './custom-api.js';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;