// errorHandler IS USED TO WHEN HANDLE ERRORS ARISING FROM THE SERVER AFTER A USER REQUEST
// ALL ERRORS COMING FROM THE CONTROLLERS ARE DISPLAYED HERE
// errorHandler TAKES US 4 ARGUMENTS & ONCE 4 ARGUMENTS ARE USED NODE KNOWS FUNCTION IS 
// AN ERROR HANDLER
import { StatusCodes } from 'http-status-codes';

// THIS ERROR HANDLER HANDLES BOTH DATABASE AND NON DB RELATED ERRORS & DISPLAYS TO USER
const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err);
    // SETTING A DEFAULT ERROR HANDLER OBJECT VARIABLE
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
        // err.message is error message passed by 'throw new Error' or next(err) in controllers
    }
    // CHECK IF THE RETURNED ERROR IS VALIDATOR ERROR & CHANGE ERROR TYPE
    if(err.name === 'ValidationError') {
        // IF ERROR RECEIVED IS A VALIDATION ERROR CHANGE IT TO BAD_REQUEST ERROR AND CHANGE ERR MESSAGE
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // defaultError.msg = err.message;
        // TURN OBJECT OF ERRORS INTO AN ARRAY & LOOP THROUGH GETTING & JOINING ERROR SPECIFIC MESSAGES
        // Object.values() RETURNS VALUES OF EACH KEY-VALUE PAIR OF AN OBJECT IN FORM OF AN ARRAY
        defaultError.msg = Object.values(err.errors).map((errorItem) => errorItem.message).join(',');
    }
    // CHECK IF THE RETURNED ERROR IS A NON UNIQUE EMAIL USED
    if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
        // SINCE CODE OF ERROR IS CHECKED EVEN BELOW CODE CAN BE USED
        // defaultError.msg = `Email field has to be unique`;
    }
    // DISPLAY THE ERROR
    // res.status(defaultError.statusCode).json({msg: err});
    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
}

// BASIC ERROR HANDLER FUNCTION
// const errorHandlerMiddleware = (err, req, res, next) => {
//     console.log(err);
//     res.status(500).json({msg: err});
// }

export default errorHandlerMiddleware;