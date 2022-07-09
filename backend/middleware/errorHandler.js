const errorHandler = (error, _req, res, _next) => {
  return res.status(error.statuscode || 400).json({ message: error.message });
};

module.exports = errorHandler;
