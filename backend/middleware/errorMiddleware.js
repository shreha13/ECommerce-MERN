 module.exports.notFound = (req, res, next) => {
  const error = new Error(`Not found- ${req.originalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return res.json({ message: err.message });
};
