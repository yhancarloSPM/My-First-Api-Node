const success = (req, res, status, message) => {
  res.status(status || 200).json({
    MESSAGE: message,
  });
};

const error = (req, res, status, message, error) => {
  console.info({ code: status, body: message });
  res.status(status || 500).json({
    ERROR: message,
  });
  console.error(error);
};

const notFound = (req, res, status, message) => {
  res.status(status || 404).json({
    ERROR: message,
  });
};

const badRequest = (req, res, status, message) => {
  res.status(status || 400).json({
    ERROR: message,
  });
};

module.exports = {
  success,
  error,
  notFound,
  badRequest,
};
