// THIS IS THE PARENT FILE FOR ALL ERRORS TO BE HANDLED

// EXTENDING ON THE ERROR OBJECT TO CREATE SPECIFIC PERSONALIZED ERRORS MESSAGES
class CustomAPIError extends Error {
    constructor(message){
        super(message);
    }
}

export default CustomAPIError;