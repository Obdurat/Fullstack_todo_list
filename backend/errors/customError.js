class newError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statuscode = statusCode;
    }
};

const newErrorCreator = (message, status) => {
    return new newError(message, status);
};

module.exports = { newError, newErrorCreator };