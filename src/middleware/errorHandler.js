const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack || '');

  // Malformed MongoDB ObjectId (e.g. /api/articles/not-a-real-id) → 400, not 500
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }

  const status = err.status || 500;

  res.status(status).json({
    error: err.message,
  });
};

module.exports = errorHandler;
