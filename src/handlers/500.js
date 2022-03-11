'use strict'

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err)
  res.status(500)
  process.env.NODE_ENV === 'production' 
    ? res.json({ error: err.message })
    : res.json({ error: err })
}
