const HttpStatus = require('http-status-codes');

module.exports = {
  notFound: function(req, res) {
    res.status(HttpStatus.NOT_FOUND).json({
      error: {
        code: HttpStatus.NOT_FOUND,
        message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      }
    });
  },
  methodNotAllowed: function(req, res) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      error: {
        code: HttpStatus.METHOD_NOT_ALLOWED,
        message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
      }
    });
  },

  bodyParser: function (err, req, res, next) {

    res.status(err.status).json({
      error: {
        code: err.status,
        message: HttpStatus.getStatusText(err.status)
      }
    });
  },

  genericErrorHandler: function (err, req, res, next) {
    res.status(100).json({ message: 'Error from server' });
  }
}



