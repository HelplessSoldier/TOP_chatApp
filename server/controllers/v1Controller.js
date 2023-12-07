const asyncHandler = require('express-async-handler');

exports.root_get = (req, res, next) => {
  res.send('hi! this is the controller')
}
