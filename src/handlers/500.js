'use strict'

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err)
  res.status(500)
}
