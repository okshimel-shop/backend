const moment = require("moment")

exports.tryCatchWrapper = (cb) => async (req, res, next) => {
  const { method, originalUrl } = req

  const start = Date.now();

  const request = await cb(req, res, next).catch((err) => next(err))

  console.log(method, "|", moment().format('HH:mm:ss'), "|", Date.now() - start, 'ms', "|", originalUrl)

  return request
};