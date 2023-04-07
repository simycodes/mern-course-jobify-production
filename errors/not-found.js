import CustomAPIError from './custom-api.js';
import { StatusCodes } from 'http-status-codes';

// CLASS TO SEND CUSTOMIZED NOT FOUND ERRORS CODES
class NotFoundError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;