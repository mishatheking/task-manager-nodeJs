

class CustomAPIError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode; 
    } 
}

const createCustomError = (msg, ststusCode) => {  
    return new CustomAPIError(msg, ststusCode)
}

module.exports = { createCustomError, CustomAPIError}
      