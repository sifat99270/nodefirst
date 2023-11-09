const createError = require("http-errors");
const notFoundHandler = (req, res, next) => {
  next(createError(404, "your requested contend was not found"));
};

const errorHandler = (err, req, res, next) => {
  const status = err.status ? err.status : 500;
  res.status(status).json({
    errors: err.message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
