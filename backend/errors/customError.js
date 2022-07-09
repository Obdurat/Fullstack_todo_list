class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statuscode = statusCode;
    }
};

const CustomErrorCreator = (message, status) => {
    return new CustomError(message, status);
};

module.exports = { CustomError, CustomErrorCreator };