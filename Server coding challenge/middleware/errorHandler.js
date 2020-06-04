function errorHandler(error, req, res) {
    error.statusCode = error.statusCode || 500;

    res.status(500);
    res.render(error.statusCode);
}

module.exports = errorHandler;