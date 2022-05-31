const errorHandler = (error, _req, res, _next) => {
    return res.status(error.statuscode).json({ message: error.message });
};

module.exports = errorHandler;