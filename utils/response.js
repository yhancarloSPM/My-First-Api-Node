const success = (req, res, status, message) => {
    res.status(status  || 200).json({
        error: ' ',
        message: message
    });
}

const error = (req, res, status, message, error) => {
console.info({code: status, body: message});
res.status(status || 500).json({
    error: message,
    message: ' '
});
console.error(error);
}

const notFound = (req, res, status, message) => {
    res.status(status || 404).json({
      error: message
    });
  };
  
  const badRequest = (req, res, status, message) => {
    res.status(status || 400).json({
      error: message
    });
  };

module.exports = {
success, 
error,
notFound,
badRequest
}